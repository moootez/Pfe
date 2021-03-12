import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid, Divider, FormGroup } from '@material-ui/core'
import { injectIntl } from 'react-intl'
import _ from 'lodash'
import Check from '../../../../ui/checkBox'
import Form from './Form'
import ButtonComponent from '../../../../ui/button'
import getResponsableBienActions from '../../../../../redux/declaration_grab/bien/revenus/getResponsableRevenu'
import getSpecesActions from '../../../../../redux/declaration_grab/bien/speces/getSpeces/index'
import addSpecesActions from '../../../../../redux/declaration_grab/bien/speces/addSpeces/index'
import updateSpecesActions from '../../../../../redux/declaration_grab/bien/speces/updateSpeces/index'
import SubTitle from '../../../../ui/subTitle/index'
import ButtonPlus from '../../../../ui/buttonPlus/index'
import ItemTitle from '../../../../ui/itemCmp'

/**
 *
 *
 * @class Index
 * @extends {Component}
 */
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            noDec: false,
            arraySpeces: [{}],
            errorSaisie: true,
            isExist: false,
            isError: false,
            errorsList: {},
            listDeclarant: [],
        }
        this.payload = {}
    }

    /* life cycle */

    /* life cycle */

    /**
     *
     *
     * @memberof
     */
    componentDidMount() {
        /* getResponsableBienReq(); */
        const { getResponsableBienReq, history, getSpecesReq } = this.props
        const { dataDeclaration } = history.location.state
        getResponsableBienReq(dataDeclaration.id)
        getSpecesReq(dataDeclaration.id)
    }

    /**
     *
     *
     * @param {*} nextProps
     * @memberof
     */
    componentWillReceiveProps(nextProps) {
        const {
            history,
            getSpeces,
            getSpecesReq,
            responseAdd,
            responseEdit,
            stepDeclaration,
            listResponsableRevenus,
        } = this.props
        const { dataDeclaration } = history.location.state
        /* get responsable valeurs  */
        if (
            nextProps.stepDeclaration !== stepDeclaration &&
            nextProps.stepDeclaration === 9 &&
            nextProps.step === 2
        ) {
            getSpecesReq(dataDeclaration.id)
        }

        /* get responsable Valeurs  */
        if (
            nextProps.listResponsableRevenus !== listResponsableRevenus &&
            Object.keys(nextProps.listResponsableRevenus).length > 0
        ) {
            const array = Object.values(nextProps.listResponsableRevenus)
            const listDeclarant = _.concat(
                array[0].length !== 0
                    ? array[0][0].length !== 0
                        ? array[0][0].value !== ' '
                            ? array[0]
                            : []
                        : []
                    : [],
                array[1].length !== 0
                    ? array[1][0].length !== 0
                        ? array[1][0].value !== ' '
                            ? array[1]
                            : []
                        : []
                    : [],
                array[2].length !== 0
                    ? array[2][0].length !== 0
                        ? array[2][0].value !== ' '
                            ? array[2]
                            : []
                        : []
                    : []
            )
            this.setState({ listDeclarant })
        }
        if (
            nextProps.getSpeces !== getSpeces &&
            nextProps.getSpeces.data.length !== 0
        ) {
            if (nextProps.getSpeces.data.length === 0) {
                this.setState({ isError: false, errorsList: {} })
            } else {
                this.setArraySpeces(nextProps.getSpeces.data)
                this.setState({
                    isExist: true,
                    errorSaisie: false,
                    isError: false,
                    errorsList: {},
                    noDec: nextProps.getSpeces.data[0].nothingToDeclare,
                })
            }
        }
        /* response add */
        if (
            nextProps.responseAdd !== responseAdd &&
            nextProps.responseAdd.data.status === 'error'
        ) {
            this.setState({
                isError: true,
                errorsList: nextProps.responseAdd.data.data,
            })
        }
        /* response edit */
        if (
            nextProps.responseEdit !== responseEdit &&
            nextProps.responseEdit.data.status === 'error'
        ) {
            this.setState({
                isError: true,
                errorsList: nextProps.responseEdit.data.data,
            })
        }
    }

    /* functions */

    /**
     *
     *
     * @memberof Animaux
     */

    setArraySpeces = resSpeces => {
        const FinalArray = []
        resSpeces.forEach(spece => {
            const objSpece = _.omit(spece, [
                'publierMontant',
                'publierNom',
                'status',
                'publishedAll',
                'publierNomRubrique',
            ])
            const dec = objSpece
            Object.keys(objSpece).forEach(key => {
                if (objSpece[key] && typeof objSpece[key] === 'object') {
                    dec[key] = dec[key].id
                }
            })
            FinalArray.push(dec)
        })
        this.setState({ arraySpeces: FinalArray })
    }

    /**
     * check radio bouton
     *
     * @memberof
     */
    setCheck = (name, checked) => {
        this.setState({ [name]: checked, errorSaisie: !checked })
        if (checked) {
            this.resetForm()
        }
    }

    /**
     * retouner objet
     *
     * @memberof
     */
    resetForm = () => {
        this.setState({ arraySpeces: [{}] })
    }

    /**
     * retourner pour la dernière page
     *
     * @memberof
     */
    cancelForm = () => {
        const { history } = this.props
        const { arraySpeces } = this.state
        if (Object.keys(arraySpeces[0]).length !== 0) {
            this.resetForm()
        } else {
            history.goBack()
        }
    }

    /**
     * set Payload
     *
     * @memberof
     */
    fieldChangedHandler = ({ target: { name, value } }, id) => {
        const { arraySpeces } = this.state
        if (value === '') delete arraySpeces[id][name]
        else arraySpeces[id][name] = value
        this.setState({ arraySpeces }, () => {
            const tmp = this.getArrayFromState()
            if (this.verifIfOk(tmp)) {
                this.setState({
                    errorSaisie: false,
                })
            } else
                this.setState({
                    errorSaisie: true,
                })
        })
    }

    /**
     * ajouter un sous rubrique
     *
     * @memberof Index
     */
    addSpecesFn = () => {
        const { arraySpeces } = this.state
        this.setState({
            arraySpeces: [...arraySpeces, {}],
            errorSaisie: true,
        })
    }

    /**
     * vérification des donnée input
     *
     * @memberof
     */
    verifIfOk = array => {
        const a = []
        array.forEach(item => {
            if (
                Object.keys(item).length === 3 ||
                (Object.keys(item).length === 5 &&
                    Object.keys(item).includes('declaration') &&
                    Object.keys(item).includes('id'))
            ) {
                a.push(item)
            }
        })
        return a.length === array.length
    }

    /**
     * render array
     *
     * @memberof
     */
    getArrayFromState = () => {
        const { arraySpeces } = this.state
        return arraySpeces
    }

    /**
     * ajouter
     *
     * @memberof
     */
    submitAdd = () => {
        const { arraySpeces, noDec, isExist } = this.state
        const { addSpecesReq, updateSpecesReq, history } = this.props
        const { dataDeclaration } = history.location.state
        const declaration = dataDeclaration.id

        const list = arraySpeces.map(speces => {
            const specesSend = speces
            specesSend.declaration = declaration
            specesSend.nothingToDeclare = noDec
            return specesSend
        })
        if (!isExist) addSpecesReq(list)
        else updateSpecesReq(list)
    }

    /**
     * suppression sous roubrique
     *
     * @memberof
     */
    subSpeces = () => {
        const { arraySpeces } = this.state
        this.setState({
            arraySpeces: arraySpeces.slice(0, arraySpeces.length - 1),
            errorSaisie: false,
        })
    }

    /* render */
    /* render */
    /**
     *
     *
     * @returns
     * @memberof Actions
     */
    render() {
        const { intl, allReferenciels, lng, history } = this.props
        const {
            noDec,
            listDeclarant,
            errorsList,
            isError,
            errorSaisie,
            arraySpeces,
            isExist,
        } = this.state
        const falseBool = false
        const { dataDeclaration } = history.location.state
        return (
            <div style={{ paddingTop: '1em' }}>
                <SubTitle label={intl.formatMessage({ id: 'Index' })} />
                <FormGroup>
                    <div className="centerDiv">
                        <Grid container>
                            {arraySpeces.map((child, index) => {
                                return (
                                    <Grid
                                        container
                                        key={intl.formatMessage({
                                            id: 'Index',
                                        })}
                                    >
                                        <Grid container>
                                            <ItemTitle
                                                label={`
                                                        ${intl.formatMessage({
                                                            id: 'montantNum',
                                                        })} ${index + 1}`}
                                            />
                                        </Grid>
                                        <Form
                                            lng={lng}
                                            intl={intl}
                                            id={index}
                                            disabled={noDec}
                                            payload={child}
                                            listDeclarant={listDeclarant}
                                            allReferenciels={allReferenciels}
                                            isError={isError}
                                            errorsList={
                                                errorsList[
                                                    `fondsEspece_${index}`
                                                ] !== undefined
                                                    ? errorsList[
                                                          `fondsEspece_${index}`
                                                      ]
                                                    : {}
                                            }
                                            fieldChangedHandler={
                                                this.fieldChangedHandler
                                            }
                                        />
                                    </Grid>
                                )
                            })}
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            className="gridItem"
                            style={{ marginTop: '15px' }}
                        >
                            <Check
                                selectedValue={noDec}
                                label={intl.formatMessage({ id: 'rien' })}
                                name="noDec"
                                onchange={(name, checked) =>
                                    this.setCheck(name, checked)
                                }
                            />
                        </Grid>
                        <Grid>
                            <center>
                                {errorSaisie && (
                                    <span
                                        style={{
                                            color: 'red',
                                            fontSize: '13px',
                                        }}
                                    >
                                        {intl.formatMessage({
                                            id: 'errsaisie',
                                        })}
                                    </span>
                                )}
                            </center>
                            <div className="d-flex justify-content-center">
                                {arraySpeces.length > 1 &&
                                dataDeclaration.user.situationCivile !==
                                    'celibataire' ? (
                                    <ButtonPlus
                                        disabled={falseBool}
                                        color="primary"
                                        fn={this.subSpeces}
                                        ariaLabel="delete"
                                    />
                                ) : null}
                                {dataDeclaration.user.situationCivile ===
                                'celibataire'
                                    ? null
                                    : !noDec &&
                                      !isExist && (
                                          <ButtonPlus
                                              ariaLabel="add"
                                              disabled={errorSaisie || noDec}
                                              color="primary"
                                              fn={this.addSpecesFn}
                                          />
                                      )}
                            </div>
                        </Grid>
                        <div style={{ textAlign: 'center', padding: 20 }}>
                            <Divider />
                            <div>
                                <ButtonComponent
                                    color="secondary"
                                    type="contained"
                                    size="medium"
                                    label={intl.formatMessage({
                                        id: 'BtnValider',
                                    })}
                                    clicked={this.submitAdd}
                                />
                                <ButtonComponent
                                    // disabled={disable}
                                    color="secondary"
                                    type="contained"
                                    size="medium"
                                    label={intl.formatMessage({
                                        id: 'btnAnnuer',
                                    })}
                                    clicked={this.cancelForm}
                                />
                            </div>
                        </div>
                    </div>
                </FormGroup>
            </div>
        )
    }
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getResponsableBienReq: payload =>
        dispatch(
            getResponsableBienActions.getResponsableRevenusRequest(payload)
        ),
    getSpecesReq: id => dispatch(getSpecesActions.getSpecesRequest(id)),
    addSpecesReq: payload =>
        dispatch(addSpecesActions.addSpecesRequest(payload)),
    updateSpecesReq: spece =>
        dispatch(updateSpecesActions.updateSpecesRequest(spece)),
})

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = state => ({
    allReferenciels: state.referencial.allReferencials.response,
    listResponsableRevenus:
        state.declarationGrab.getResponsableRevenus.response,
    lng: state.info.language,
    step: state.stepSaisie.step,
    getSpeces: state.declarationGrab.decBien.speces.getSpeces.response,
    responseAdd: state.declarationGrab.decBien.speces.addSpeces.response,
    responseEdit: state.declarationGrab.decBien.speces.updateSpeces.response,
    stepDeclaration: state.stepSaisie.stepDeclaration,
})

/**
 *  Inialisation
 */
Index.defaultProps = {
    getSpeces: null,
    allReferenciels: {},
    listResponsableRevenus: null,
    responseAdd: null,
    responseEdit: null,
}
/**
 *  declaration des props
 */
Index.propTypes = {
    getResponsableBienReq: PropTypes.func.isRequired,
    addSpecesReq: PropTypes.func.isRequired,
    updateSpecesReq: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    getSpecesReq: PropTypes.func.isRequired,
    getSpeces: PropTypes.object,
    history: PropTypes.object.isRequired,
    /* getResponsableBienReq: PropTypes.func.isRequired, */
    allReferenciels: PropTypes.object,
    listResponsableRevenus: PropTypes.object,
    lng: PropTypes.string.isRequired,
    stepDeclaration: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    responseAdd: PropTypes.object,
    responseEdit: PropTypes.object,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
