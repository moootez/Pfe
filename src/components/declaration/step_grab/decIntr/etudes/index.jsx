import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid, Divider, FormGroup } from '@material-ui/core'
import { injectIntl } from 'react-intl'
import _ from 'lodash'
import Check from '../../../../ui/checkBox'
import Form from './Form'
import ButtonComponent from '../../../../ui/button'
import getEtudesActions from '../../../../../redux/declaration_grab/interets/etudes/getEtudes/index'
import addEtudesActions from '../../../../../redux/declaration_grab/interets/etudes/addEtudes/index'
import updateEtudesActions from '../../../../../redux/declaration_grab/interets/etudes/updateEtudes/index'
import SubTitle from '../../../../ui/subTitle/index'
import ButtonPlus from '../../../../ui/buttonPlus/index'
import getResponsableBienActions from '../../../../../redux/declaration_grab/bien/revenus/getResponsableRevenu'
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
            arrayEtudes: [{}],
            errorSaisie: true,
            isExist: false,
            isError: false,
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
        const { history, getEtudesReq, getResponsableBienReq } = this.props
        const { dataDeclaration } = history.location.state
        getEtudesReq(dataDeclaration.id)
        getResponsableBienReq(dataDeclaration.id)
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
            getEtudesReq,
            responseAdd,
            responseEdit,
            getEtudes,
            stepDeclaration,
            step,
            getResponsableBienReq,
        } = this.props
        const { dataDeclaration } = history.location.state
        /* get responsable revenus  */
        if (
            (nextProps.stepDeclaration !== stepDeclaration ||
                nextProps.step !== step) &&
            (nextProps.stepDeclaration === 0 && nextProps.step === 3)
        ) {
            getEtudesReq(dataDeclaration.id)
            getResponsableBienReq(dataDeclaration.id)
        }
        if (
            nextProps.getEtudes !== getEtudes &&
            nextProps.getEtudes.data.length !== 0
        ) {
            if (nextProps.getEtudes.data.length === 0) {
                this.setState({ isError: false, errorsList: {} })
            } else {
                this.setArrayEtudes(nextProps.getEtudes.data)
                this.setState({
                    isExist: true,
                    errorSaisie: false,
                    isError: false,
                    errorsList: {},
                    noDec: nextProps.getEtudes.data[0].nothingToDeclare,
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

    setArrayEtudes = resEtudes => {
        const FinalArray = []
        resEtudes.forEach(etude => {
            const objEtudes = _.omit(etude, [
                'publierNature',
                'publierAnnee',
                'publierSociete',
                'status',
                'publishedAll',
                'publierNomRubrique',
            ])
            const dec = objEtudes
            Object.keys(objEtudes).forEach(key => {
                if (objEtudes[key] && typeof objEtudes[key] === 'object') {
                    dec[key] = dec[key].id
                }
            })
            FinalArray.push(dec)
        })
        this.setState({ arrayEtudes: FinalArray })
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
        this.setState({ arrayEtudes: [{}] })
    }

    /**
     * retourner pour la dernière page
     *
     * @memberof
     */
    cancelForm = () => {
        const { history } = this.props
        const { arrayEtudes } = this.state
        if (Object.keys(arrayEtudes[0]).length !== 0) {
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
        const { arrayEtudes, errorsList } = this.state
        if (name === 'annee') {
            const valueChanged = value.toString()
            if (valueChanged.length !== 4)
                this.setState({
                    isError: true,
                    errorsList: {
                        ...errorsList,
                        annee: { ar: 'الرجاء إدخال 4 أرقام' },
                    },
                })
            else
                this.setState({
                    isError: false,
                    errorsList: delete errorsList.annee,
                })
        }
        if (value === '') delete arrayEtudes[id][name]
        else arrayEtudes[id][name] = value
        this.setState({ arrayEtudes }, () => {
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
    addEtudesFn = () => {
        const { arrayEtudes } = this.state
        this.setState({
            arrayEtudes: [...arrayEtudes, {}],
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
        const { arrayEtudes } = this.state
        return arrayEtudes
    }

    /**
     * ajouter
     *
     * @memberof
     */
    submitAdd = () => {
        const { arrayEtudes, noDec, isExist } = this.state
        const { addEtudesReq, updateEtudesReq, history } = this.props
        const { dataDeclaration } = history.location.state
        const declaration = dataDeclaration.id

        const list = arrayEtudes.map(etude => {
            const etudesSend = etude
            etudesSend.declaration = declaration
            etudesSend.nothingToDeclare = noDec
            return etudesSend
        })
        if (!isExist) addEtudesReq(list)
        else updateEtudesReq(list)
    }

    /**
     * suppression sous roubrique
     *
     * @memberof
     */
    subEtudes = () => {
        const { arrayEtudes } = this.state
        this.setState({
            arrayEtudes: arrayEtudes.slice(0, arrayEtudes.length - 1),
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
        const { intl, lng } = this.props
        const {
            noDec,
            errorsList,
            isError,
            errorSaisie,
            arrayEtudes,
            isExist,
        } = this.state
        const falseBool = false
        return (
            <div style={{ paddingTop: '1em' }}>
                <SubTitle
                    label={intl.formatMessage({
                        id: 'etudes',
                    })}
                />
                <FormGroup>
                    <div className="centerDiv">
                        <Grid container>
                            {arrayEtudes.map((child, index) => {
                                return (
                                    <Grid
                                        container
                                        key={intl.formatMessage({
                                            id: 'etudes',
                                        })}
                                    >
                                        <Grid container>
                                            <ItemTitle
                                                label={`
                                                        ${intl.formatMessage({
                                                            id: 'etudeNum',
                                                        })} ${index + 1}`}
                                            />
                                        </Grid>
                                        <Form
                                            lng={lng}
                                            intl={intl}
                                            id={index}
                                            disabled={noDec}
                                            payload={child}
                                            isError={isError}
                                            errorsList={
                                                errorsList[
                                                    `statement_${index}`
                                                ] !== undefined
                                                    ? errorsList[
                                                          `statement_${index}`
                                                      ]
                                                    : errorsList
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
                                {arrayEtudes.length > 1 && (
                                    <ButtonPlus
                                        disabled={falseBool}
                                        color="primary"
                                        fn={this.subEtudes}
                                        ariaLabel="delete"
                                    />
                                )}
                                {!noDec && !isExist && (
                                    <ButtonPlus
                                        ariaLabel="add"
                                        disabled={errorSaisie || noDec}
                                        color="primary"
                                        fn={this.addEtudesFn}
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
    getEtudesReq: id => dispatch(getEtudesActions.getEtudesRequest(id)),
    addEtudesReq: payload =>
        dispatch(addEtudesActions.addEtudesRequest(payload)),
    updateEtudesReq: cadeau =>
        dispatch(updateEtudesActions.updateEtudesRequest(cadeau)),
    getResponsableBienReq: payload =>
        dispatch(
            getResponsableBienActions.getResponsableRevenusRequest(payload)
        ),
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
    getEtudes: state.declarationGrab.interets.etudes.getEtudes.response,
    responseAdd: state.declarationGrab.interets.etudes.addEtudes.response,
    responseEdit: state.declarationGrab.interets.etudes.updateEtudes.response,
    stepDeclaration: state.stepSaisie.stepDeclaration,
})
/**
 *  Inialisation
 */
Index.defaultProps = {
    getEtudes: null,
    responseAdd: null,
    responseEdit: null,
}
/**
 *  declaration des props
 */
Index.propTypes = {
    addEtudesReq: PropTypes.func.isRequired,
    updateEtudesReq: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    getEtudesReq: PropTypes.func.isRequired,
    getEtudes: PropTypes.object,
    history: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
    stepDeclaration: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    responseAdd: PropTypes.object,
    responseEdit: PropTypes.object,
    getResponsableBienReq: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
