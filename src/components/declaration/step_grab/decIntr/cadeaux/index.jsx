import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid, Divider, FormGroup } from '@material-ui/core'
import { injectIntl } from 'react-intl'
import _ from 'lodash'
import Check from '../../../../ui/checkBox'
import Form from './Form'
import ButtonComponent from '../../../../ui/button'
import getCadeauxActions from '../../../../../redux/declaration_grab/interets/cadeaux/getCadeaux/index'
import addCadeauxActions from '../../../../../redux/declaration_grab/interets/cadeaux/addCadeaux/index'
import updateCadeauxActions from '../../../../../redux/declaration_grab/interets/cadeaux/updateCadeaux/index'
import getResponsableBienActions from '../../../../../redux/declaration_grab/bien/revenus/getResponsableRevenu'
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
            arrayCadeaux: [{}],
            errorSaisie: true,
            isExist: false,
            isError: false,
            listDeclarant: [],
            errorsList: {},
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
        const { history, getCadeauxReq, getResponsableBienReq } = this.props
        const { dataDeclaration } = history.location.state
        getResponsableBienReq(dataDeclaration.id)
        getCadeauxReq(dataDeclaration.id)
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
            getCadeauxReq,
            responseAdd,
            responseEdit,
            getCadeaux,
            stepDeclaration,
            listResponsableRevenus,
        } = this.props
        const { dataDeclaration } = history.location.state
        /* get responsable revenus  */
        if (
            nextProps.stepDeclaration !== stepDeclaration &&
            nextProps.stepDeclaration === 5 &&
            nextProps.step === 3
        ) {
            getCadeauxReq(dataDeclaration.id)
        }
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
            nextProps.getCadeaux !== getCadeaux &&
            nextProps.getCadeaux.data.length !== 0
        ) {
            if (nextProps.getCadeaux.data.length === 0) {
                this.setState({ isError: false, errorsList: {} })
            } else {
                this.setArrayCadeaux(nextProps.getCadeaux.data)
                this.setState({
                    isExist: true,
                    errorSaisie: false,
                    isError: false,
                    errorsList: {},
                    noDec: nextProps.getCadeaux.data[0].nothingToDeclare,
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

    setArrayCadeaux = resCadeaux => {
        const FinalArray = []
        resCadeaux.forEach(Cadeau => {
            const objCadeaux = _.omit(Cadeau, [
                'publierValeur',
                'publierDonneur',
                'publierCadeau',
                'publierNom',
                'status',
                'publishedAll',
                'publierNomRubrique',
            ])
            const dec = objCadeaux
            Object.keys(objCadeaux).forEach(key => {
                if (objCadeaux[key] && typeof objCadeaux[key] === 'object') {
                    dec[key] = dec[key].id
                }
            })
            FinalArray.push(dec)
        })
        this.setState({ arrayCadeaux: FinalArray })
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
        this.setState({ arrayCadeaux: [{}] })
    }

    /**
     * retourner pour la dernière page
     *
     * @memberof
     */
    cancelForm = () => {
        const { history } = this.props
        const { arrayCadeaux } = this.state
        if (Object.keys(arrayCadeaux[0]).length !== 0) {
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
        const { arrayCadeaux } = this.state
        if (value === '') delete arrayCadeaux[id][name]
        else arrayCadeaux[id][name] = value
        this.setState({ arrayCadeaux }, () => {
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
     * ajouter sous rubrique
     *
     * @memberof Immeubles
     */
    addCadeauxFn = () => {
        const { arrayCadeaux } = this.state
        this.setState({
            arrayCadeaux: [...arrayCadeaux, {}],
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
                Object.keys(item).length === 4 ||
                (Object.keys(item).length === 6 &&
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
        const { arrayCadeaux } = this.state
        return arrayCadeaux
    }

    /**
     * ajouter
     *
     * @memberof
     */
    submitAdd = () => {
        const { arrayCadeaux, noDec, isExist } = this.state
        const { addCadeauxReq, updateCadeauxReq, history } = this.props
        const { dataDeclaration } = history.location.state
        const declaration = dataDeclaration.id
        const list = arrayCadeaux.map(Cadeau => {
            const cadeauxSend = Cadeau
            cadeauxSend.declaration = declaration
            cadeauxSend.nothingToDeclare = noDec
            return cadeauxSend
        })
        if (!isExist) addCadeauxReq(list)
        else updateCadeauxReq(list)
    }

    /**
     * suppression sous roubrique
     *
     * @memberof
     */
    subCadeaux = () => {
        const { arrayCadeaux } = this.state
        this.setState({
            arrayCadeaux: arrayCadeaux.slice(0, arrayCadeaux.length - 1),
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
        const { intl, lng, allReferenciels } = this.props
        const {
            noDec,
            errorsList,
            isError,
            errorSaisie,
            arrayCadeaux,
            listDeclarant,
            isExist,
        } = this.state
        const falseBool = false
        return (
            <div style={{ paddingTop: '1em' }}>
                <SubTitle
                    label={intl.formatMessage({
                        id: 'cadeaux',
                    })}
                />
                <FormGroup>
                    <div className="centerDiv">
                        <Grid container>
                            {arrayCadeaux.map((child, index) => {
                                return (
                                    <Grid
                                        container
                                        key={intl.formatMessage({
                                            id: 'cadeaux',
                                        })}
                                    >
                                        <Grid container>
                                            <ItemTitle
                                                label={`
                                                        ${intl.formatMessage({
                                                            id: 'cadeauNum',
                                                        })} ${index + 1}`}
                                            />
                                        </Grid>
                                        <Form
                                            lng={lng}
                                            intl={intl}
                                            id={index}
                                            disabled={noDec}
                                            listDeclarant={listDeclarant}
                                            payload={child}
                                            isError={isError}
                                            errorsList={
                                                errorsList[`gift_${index}`] !==
                                                undefined
                                                    ? errorsList[
                                                          `gift_${index}`
                                                      ]
                                                    : {}
                                            }
                                            allReferenciels={allReferenciels}
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
                                {arrayCadeaux.length > 1 && (
                                    <ButtonPlus
                                        disabled={falseBool}
                                        color="primary"
                                        fn={this.subCadeaux}
                                        ariaLabel="delete"
                                    />
                                )}
                                {!noDec && !isExist && (
                                    <ButtonPlus
                                        ariaLabel="add"
                                        disabled={errorSaisie || noDec}
                                        color="primary"
                                        fn={this.addCadeauxFn}
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
    getCadeauxReq: id => dispatch(getCadeauxActions.getCadeauxRequest(id)),
    addCadeauxReq: payload =>
        dispatch(addCadeauxActions.addCadeauxRequest(payload)),
    updateCadeauxReq: cadeau =>
        dispatch(updateCadeauxActions.updateCadeauxRequest(cadeau)),
})

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = state => ({
    lng: state.info.language,
    step: state.stepSaisie.step,
    listResponsableRevenus:
        state.declarationGrab.getResponsableRevenus.response,
    getCadeaux: state.declarationGrab.interets.cadeaux.getCadeaux.response,
    responseAdd: state.declarationGrab.interets.cadeaux.addCadeaux.response,
    responseEdit: state.declarationGrab.interets.cadeaux.updateCadeaux.response,
    stepDeclaration: state.stepSaisie.stepDeclaration,
    allReferenciels: state.referencial.allReferencials.response,
})
/**
 *  Inialisation
 */
Index.defaultProps = {
    getCadeaux: null,
    listResponsableRevenus: null,
    responseAdd: null,
    responseEdit: null,
    allReferenciels: {},
}
/**
 *  declaration des props
 */
Index.propTypes = {
    getResponsableBienReq: PropTypes.func.isRequired,
    addCadeauxReq: PropTypes.func.isRequired,
    updateCadeauxReq: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    getCadeauxReq: PropTypes.func.isRequired,
    getCadeaux: PropTypes.object,
    listResponsableRevenus: PropTypes.object,
    history: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
    stepDeclaration: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    responseAdd: PropTypes.object,
    responseEdit: PropTypes.object,
    allReferenciels: PropTypes.object,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
