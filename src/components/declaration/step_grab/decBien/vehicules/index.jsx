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
import getVehiculesActions from '../../../../../redux/declaration_grab/bien/vehicules/getVehicules/index'
import addVehiculesActions from '../../../../../redux/declaration_grab/bien/vehicules/AddVehicules/index'
import updateVehiculesActions from '../../../../../redux/declaration_grab/bien/vehicules/updateVehicules/index'
import SubTitle from '../../../../ui/subTitle/index'
import ButtonPlus from '../../../../ui/buttonPlus/index'
import ItemTitle from '../../../../ui/itemCmp'
import alertActions from '../../../../../redux/alert'
import isExistMatriculeActions from '../../../../../redux/declaration_grab/bien/vehicules/isExistMatricule/index'
import PopupAutre from '../../popupAutre'

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
            arrayVehicules: [{}],
            errorSaisie: true,
            isExist: false,
            isError: false,
            existMatricule: false,
            errorsList: {},
            listDeclarant: [],
            openModal: false,
            addedFieldId: 0,
            openModalMoyen: false,
            addedFieldIdMoyen: 0,
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
        const { getResponsableBienReq, history, getVehiculesReq } = this.props
        const { dataDeclaration } = history.location.state
        getResponsableBienReq(dataDeclaration.id)
        getVehiculesReq(dataDeclaration.id)
    }

    /**
     *
     *
     * @param {*} nextProps
     * @memberof
     */
    componentWillReceiveProps(nextProps) {
        const {
            intl,
            alertShow,
            getVehiculesReq,
            stepDeclaration,
            history,
            getVehicules,
            responseAdd,
            responseEdit,
        } = this.props
        /* get responsable Index et Index  */
        const { dataDeclaration } = history.location.state
        if (
            nextProps.stepDeclaration !== stepDeclaration &&
            nextProps.stepDeclaration === 2 &&
            nextProps.step === 2
        ) {
            getVehiculesReq(dataDeclaration.id)
        }
        /* get responsable revenus  */
        if (
            nextProps.listResponsableRevenus &&
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
        /* get Immeuble */
        if (
            nextProps.getVehicules !== getVehicules &&
            nextProps.getVehicules.data.length !== 0
        ) {
            if (nextProps.getVehicules.data.length === 0) {
                this.setState({ isError: false, errorsList: {} })
            } else {
                this.setArrayVehicules(nextProps.getVehicules.data)
                this.setState({
                    isExist: true,
                    errorSaisie: false,
                    isError: false,
                    errorsList: {},
                    noDec: nextProps.getVehicules.data[0].nothingToDeclare,
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

        /* if exist matricule */
        if (nextProps.isExistMatriculeTest) {
            if (nextProps.isExistMatriculeTest === true) {
                alertShow(true, {
                    warning: false,
                    info: false,
                    error: true,
                    success: false,
                    message: intl.formatMessage({
                        id: 'isExistMatricule',
                    }),
                })
                this.setState({
                    existMatricule: nextProps.isExistMatriculeTest,
                })
            }
        } else this.setState({ existMatricule: nextProps.isExistMatriculeTest })
    }

    /* functions */

    /**
     *
     *
     * @memberof Animaux
     */

    setArrayVehicules = resVehicules => {
        const FinalArray = []
        resVehicules.forEach(revenue => {
            const objRevenue = _.omit(revenue, [
                'publierAddressExistance',
                'publierDateCirculation',
                'publierImmatriculation',
                'publierValeurAcquisation',
                'publierMoyenAcquisation',
                'publierDateAcquisation',
                'publierPuissance',
                'publierType',
                'publierNom',
                'publierMarque',
                'status',
                'publishedAll',
                'publierNomRubrique',
            ])
            const dec = objRevenue
            Object.keys(objRevenue).forEach(key => {
                if (objRevenue[key] && typeof objRevenue[key] === 'object') {
                    dec[key] = dec[key].id
                }
            })
            FinalArray.push(dec)
        })
        this.setState({ arrayVehicules: FinalArray })
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
        this.setState({ arrayVehicules: [{}] })
    }

    /**
     * retourner pour la dernière page
     *
     * @memberof
     */
    cancelForm = () => {
        const { history } = this.props
        const { arrayVehicules } = this.state
        if (Object.keys(arrayVehicules[0]).length !== 0) {
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
        const { arrayVehicules } = this.state
        if (value === undefined && name === 'type')
            this.setState({ openModal: true, addedFieldId: id })
        if (value === undefined && name === 'moyenAcquisation')
            this.setState({ openModalMoyen: true, addedFieldIdMoyen: id })
        if (value === '') delete arrayVehicules[id][name]
        else arrayVehicules[id][name] = value
        this.setState({ arrayVehicules }, () => {
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

    addVehiculeFn = () => {
        const { arrayVehicules } = this.state
        this.setState({
            arrayVehicules: [...arrayVehicules, {}],
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
                Object.keys(item).length === 10 ||
                (Object.keys(item).length === 13 &&
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
        const { arrayVehicules } = this.state
        return arrayVehicules
    }

    /**
     * ajouter
     *
     * @memberof
     */
    submitAdd = () => {
        const { arrayVehicules, noDec, existMatricule, isExist } = this.state
        const {
            addVehiculesReq,
            updateVehiculesReq,
            history,
            intl,
            alertShow,
        } = this.props
        const { dataDeclaration } = history.location.state
        const declaration = dataDeclaration.id
        if (!existMatricule) {
            const list = arrayVehicules.map(revenue => {
                const revenueSend = revenue
                revenueSend.declaration = declaration
                revenueSend.nothingToDeclare = noDec
                return revenueSend
            })
            if (!isExist) addVehiculesReq(list)
            else updateVehiculesReq(list)
        } else
            alertShow(true, {
                warning: false,
                info: false,
                error: true,
                success: false,
                message: intl.formatMessage({
                    id: 'isExistMatricule',
                }),
            })
    }

    /**
     * suppression sous roubrique
     *
     * @memberof
     */
    subVehicules = () => {
        const { arrayVehicules } = this.state
        this.setState({
            arrayVehicules: arrayVehicules.slice(0, arrayVehicules.length - 1),
            errorSaisie: false,
        })
    }

    /**
     * payload popup autre
     *
     * @memberof Actions
     */
    getAddedField = ({ name, value }, id) => {
        const { arrayVehicules } = this.state
        arrayVehicules[id][name] = value
        this.closeModal()
    }

    /**
     * fermer modal
     *
     * @memberof Actions
     */
    closeModal = () => {
        this.setState({ openModal: false, openModalMoyen: false })
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
        const { intl, allReferenciels, lng, isExistMatricule } = this.props
        const {
            noDec,
            listDeclarant,
            errorsList,
            isError,
            errorSaisie,
            arrayVehicules,
            openModal,
            addedFieldId,
            openModalMoyen,
            addedFieldIdMoyen,
            isExist,
        } = this.state
        const falseBool = false
        return (
            <div style={{ paddingTop: '1em' }}>
                <SubTitle label={intl.formatMessage({ id: 'vehicule' })} />
                <FormGroup>
                    <div className="centerDiv">
                        <Grid container>
                            {arrayVehicules.map((child, index) => {
                                return (
                                    <Grid
                                        container
                                        key={intl.formatMessage({
                                            id: 'vehicule',
                                        })}
                                    >
                                        <Grid container>
                                            <ItemTitle
                                                label={`
                                                        ${intl.formatMessage({
                                                            id: 'vecule',
                                                        })} ${index + 1}`}
                                            />
                                        </Grid>
                                        <Form
                                            lng={lng}
                                            intl={intl}
                                            id={index}
                                            disabled={noDec}
                                            isExistMatricule={isExistMatricule}
                                            payload={child}
                                            listDeclarant={listDeclarant}
                                            allReferenciels={allReferenciels}
                                            isError={isError}
                                            errorsList={
                                                errorsList[
                                                    `vehicule_${index}`
                                                ] !== undefined
                                                    ? errorsList[
                                                          `vehicule_${index}`
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
                        <PopupAutre
                            openModal={openModal}
                            onClickAway={this.closeModal}
                            AddedField={this.getAddedField}
                            payload={{
                                publier: false,
                                categorie: 'RefTypeVehicule',
                            }}
                            id={addedFieldId}
                            fieldName="type"
                        />
                        <PopupAutre
                            openModal={openModalMoyen}
                            onClickAway={this.closeModal}
                            AddedField={this.getAddedField}
                            payload={{
                                publier: false,
                                categorie: 'RefMoyenAcquisation',
                            }}
                            id={addedFieldIdMoyen}
                            fieldName="moyenAcquisation"
                        />
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
                                {arrayVehicules.length > 1 && (
                                    <ButtonPlus
                                        disabled={falseBool}
                                        color="primary"
                                        fn={this.subVehicules}
                                        ariaLabel="delete"
                                    />
                                )}
                                {!noDec && !isExist && (
                                    <ButtonPlus
                                        ariaLabel="add"
                                        disabled={errorSaisie || noDec}
                                        color="primary"
                                        fn={this.addVehiculeFn}
                                    />
                                )}
                            </div>
                        </Grid>
                        <div style={{ textAlign: 'center', padding: 20 }}>
                            <Divider />
                            <div>
                                <ButtonComponent
                                    // disabled={errorSaisie}
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
    alertShow: (show, info) =>
        dispatch(
            alertActions.alertShow(show, {
                onConfirm: info.onConfirm,
                warning: info.warning,
                info: info.info,
                error: info.error,
                success: info.success,
                message: info.message,
                title: info.title,
            })
        ),
    getVehiculesReq: id =>
        dispatch(getVehiculesActions.getVehiculesRequest(id)),
    isExistMatricule: v =>
        dispatch(isExistMatriculeActions.isExistMatriculeRequest(v)),
    addVehiculesReq: payload =>
        dispatch(addVehiculesActions.addVehiculesRequest(payload)),
    updateVehiculesReq: revenue =>
        dispatch(updateVehiculesActions.updateVehiculesRequest(revenue)),
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
    getVehicules: state.declarationGrab.decBien.vehicules.getVehicules.response,
    isExistMatriculeTest:
        state.declarationGrab.decBien.vehicules.isExistMatricule.response,
    stepDeclaration: state.stepSaisie.stepDeclaration,
    responseAdd: state.declarationGrab.decBien.vehicules.addVehicules.response,
    responseEdit:
        state.declarationGrab.decBien.vehicules.updateVehicules.response,
})

/**
 *  Inialisation
 */
Index.defaultProps = {
    getVehicules: null,
    listResponsableRevenus: null,
    allReferenciels: {},
    isExistMatriculeTest: null,
    responseAdd: null,
    responseEdit: null,
}
/**
 *  declaration des props
 */
Index.propTypes = {
    getVehiculesReq: PropTypes.func.isRequired,
    isExistMatricule: PropTypes.func.isRequired,
    addVehiculesReq: PropTypes.func.isRequired,
    getResponsableBienReq: PropTypes.func.isRequired,
    updateVehiculesReq: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    getVehicules: PropTypes.object,
    isExistMatriculeTest: PropTypes.bool,
    history: PropTypes.object.isRequired,
    /* getResponsableBienReq: PropTypes.func.isRequired, */
    allReferenciels: PropTypes.object,
    listResponsableRevenus: PropTypes.object,
    lng: PropTypes.string.isRequired,
    stepDeclaration: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    alertShow: PropTypes.func.isRequired,
    responseAdd: PropTypes.object,
    responseEdit: PropTypes.object,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
