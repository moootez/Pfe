import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid, Divider, FormGroup } from '@material-ui/core'
import { injectIntl } from 'react-intl'
import _ from 'lodash'
import Check from '../../../../ui/checkBox'
// import Toast from '../../../../utilitys/Toast'
import Form from './Form'
import ButtonComponent from '../../../../ui/button'
import getResponsableBienActions from '../../../../../redux/declaration_grab/bien/revenus/getResponsableRevenu'
import getRevenusActions from '../../../../../redux/declaration_grab/bien/revenus/getRevenus/index'
import addRevenusActions from '../../../../../redux/declaration_grab/bien/revenus/addRevenus/index'
import updateRevenusActions from '../../../../../redux/declaration_grab/bien/revenus/updateRevenus/index'
import SubTitle from '../../../../ui/subTitle/index'
import ButtonPlus from '../../../../ui/buttonPlus/index'
import ItemTitle from '../../../../ui/itemCmp'
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
            arrayRevenus: [{}],
            errorSaisie: true,
            isExist: false,
            isError: false,
            errorsList: {},
            listDeclarant: [],
            openModal: false,
            addedFieldId: 0,
            openModalPreuve: false,
            addedFieldIdPreuve: 0,
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
        const { getResponsableBienReq, history, getRevenusReq } = this.props
        const { dataDeclaration } = history.location.state
        getResponsableBienReq(dataDeclaration.id)
        getRevenusReq(dataDeclaration.id)
    }

    /**
     *
     *
     * @param {*} nextProps
     * @memberof
     */
    componentWillReceiveProps(nextProps) {
        // const { isExist } = this.state
        const {
            history,
            setDisabled,
            getRevenusReq,
            responseAdd,
            responseEdit,
            getResponsableBienReq,
            getRevenus,
            stepDeclaration,
            listResponsableRevenus,
            step,
        } = this.props
        const { dataDeclaration } = history.location.state
        /* get responsable revenus  */
        if (
            (nextProps.stepDeclaration !== stepDeclaration ||
                nextProps.step !== step) &&
            (nextProps.stepDeclaration === 0 && nextProps.step === 2)
        ) {
            getRevenusReq(dataDeclaration.id)
            getResponsableBienReq(dataDeclaration.id)
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
            nextProps.getRevenus !== getRevenus &&
            nextProps.getRevenus.data.length !== 0
        ) {
            if (nextProps.getRevenus.data.length === 0) {
                this.setState({ isError: false, errorsList: {} })
            } else {
                this.setArrayRevenus(nextProps.getRevenus.data)
                this.setState({
                    isExist: true,
                    errorSaisie: false,
                    isError: false,
                    errorsList: {},
                    noDec: nextProps.getRevenus.data[0].nothingToDeclare,
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

        if (
            dataDeclaration.user.situationCivile === 'marié' &&
            (nextProps.getRevenus &&
                nextProps.getRevenus.status === 'success' &&
                nextProps.getVehicules &&
                nextProps.getVehicules.status === 'success' &&
                nextProps.getConjoint &&
                nextProps.getConjoint.status === 'success' &&
                nextProps.getEnfant &&
                nextProps.getEnfant.status === 'success' &&
                nextProps.getActions &&
                nextProps.getActions.status === 'success' &&
                nextProps.getAssurances &&
                nextProps.getAssurances.status === 'success' &&
                nextProps.getFonts &&
                nextProps.getFonts.status === 'success' &&
                nextProps.getSpeces &&
                nextProps.getSpeces.status === 'success' &&
                nextProps.getImmeubles &&
                nextProps.getImmeubles.status === 'success' &&
                nextProps.getMontants &&
                nextProps.getMontants.status === 'success' &&
                nextProps.getObjSpeciaux &&
                nextProps.getObjSpeciaux.status === 'success' &&
                nextProps.getPrets &&
                nextProps.getPrets.status === 'success' &&
                nextProps.getPartSocials &&
                nextProps.getPartSocials.status === 'success' &&
                nextProps.getActConjoint &&
                nextProps.getActConjoint.status === 'success' &&
                nextProps.getCadeaux &&
                nextProps.getCadeaux.status === 'success' &&
                nextProps.getEtudes &&
                nextProps.getEtudes.status === 'success' &&
                nextProps.getMembres &&
                nextProps.getMembres.status === 'success' &&
                nextProps.getLiberale &&
                nextProps.getLiberale.status === 'success' &&
                nextProps.getSalarie &&
                nextProps.getSalarie.status === 'success' &&
                nextProps.getAnimaux &&
                nextProps.getAnimaux.status === 'success')
        )
            setDisabled(false)
        else if (
            dataDeclaration.user.situationCivile !== 'marié' &&
            (nextProps.getRevenus &&
                nextProps.getRevenus.status === 'success' &&
                nextProps.getVehicules &&
                nextProps.getVehicules.status === 'success' &&
                nextProps.getActions &&
                nextProps.getActions.status === 'success' &&
                nextProps.getAssurances &&
                nextProps.getAssurances.status === 'success' &&
                nextProps.getFonts &&
                nextProps.getFonts.status === 'success' &&
                nextProps.getSpeces &&
                nextProps.getSpeces.status === 'success' &&
                nextProps.getImmeubles &&
                nextProps.getImmeubles.status === 'success' &&
                nextProps.getMontants &&
                nextProps.getMontants.status === 'success' &&
                nextProps.getObjSpeciaux &&
                nextProps.getObjSpeciaux.status === 'success' &&
                nextProps.getPrets &&
                nextProps.getPrets.status === 'success' &&
                nextProps.getPartSocials &&
                nextProps.getPartSocials.status === 'success' &&
                nextProps.getActConjoint &&
                nextProps.getActConjoint.status === 'success' &&
                nextProps.getCadeaux &&
                nextProps.getCadeaux.status === 'success' &&
                nextProps.getEtudes &&
                nextProps.getEtudes.status === 'success' &&
                nextProps.getMembres &&
                nextProps.getMembres.status === 'success' &&
                nextProps.getLiberale &&
                nextProps.getLiberale.status === 'success' &&
                nextProps.getSalarie &&
                nextProps.getSalarie.status === 'success' &&
                nextProps.getAnimaux &&
                nextProps.getAnimaux.status === 'success')
        )
            setDisabled(false)
        else setDisabled(true)
    }

    /* functions */

    /**
     *
     *
     * @memberof Animaux
     */

    setArrayRevenus = resRevenus => {
        const FinalArray = []
        resRevenus.forEach(revenue => {
            const objRevenue = _.omit(revenue, [
                'qrCode',
                'publierMontant',
                'publierAll',
                'publishedAll',
                'publierNatureRevenue',
                'status',
                'publierNom',
                'publierNomRubrique',
                'publierSource',
                'publierPreuveJustificative',
                'publierTypeDevise',
            ])
            const dec = objRevenue
            Object.keys(objRevenue).forEach(key => {
                if (objRevenue[key] && typeof objRevenue[key] === 'object') {
                    dec[key] = dec[key].id
                }
            })
            FinalArray.push(dec)
        })
        this.setState({ arrayRevenus: FinalArray })
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
        this.setState({ arrayRevenus: [{}] })
    }

    /**
     * retourner pour la dernière page
     *
     * @memberof
     */
    cancelForm = () => {
        const { history } = this.props
        const { arrayRevenus } = this.state
        if (Object.keys(arrayRevenus[0]).length !== 0) {
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
        const { arrayRevenus } = this.state
        if (value === undefined && name === 'natureRevenue')
            this.setState({ openModal: true, addedFieldId: id })
        if (value === undefined && name === 'preuveJustificative')
            this.setState({ openModalPreuve: true, addedFieldIdPreuve: id })
        if (value === '') delete arrayRevenus[id][name]
        else arrayRevenus[id][name] = value
        this.setState({ arrayRevenus }, () => {
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
    addRevenusFn = () => {
        const { arrayRevenus } = this.state
        this.setState({
            arrayRevenus: [...arrayRevenus, {}],
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
                Object.keys(item).length === 6 ||
                (Object.keys(item).length === 8 &&
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
        const { arrayRevenus } = this.state
        return arrayRevenus
    }

    /**
     * ajouter
     *
     * @memberof
     */
    submitAdd = () => {
        const { arrayRevenus, isExist, noDec } = this.state
        const { addRevenusReq, updateRevenusReq, history } = this.props
        const { dataDeclaration } = history.location.state
        const declaration = dataDeclaration.id

        const list = arrayRevenus.map(revenue => {
            const revenueSend = revenue
            revenueSend.declaration = declaration
            revenueSend.nothingToDeclare = noDec
            return revenueSend
        })
        if (!isExist) addRevenusReq(list)
        else updateRevenusReq(list)
    }

    /**
     * suppression sous roubrique
     *
     * @memberof
     */
    subRevenus = () => {
        const { arrayRevenus } = this.state
        this.setState({
            arrayRevenus: arrayRevenus.slice(0, arrayRevenus.length - 1),
            errorSaisie: false,
        })
    }

    /**
     * fermer modal
     *
     * @memberof Actions
     */
    closeModal = () => {
        this.setState({ openModal: false, openModalPreuve: false })
    }

    /**
     * payload popup autre
     *
     * @memberof Actions
     */
    getAddedField = ({ name, value }, id) => {
        const { arrayRevenus } = this.state
        arrayRevenus[id][name] = value
        this.closeModal()
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
        const { intl, allReferenciels, lng } = this.props
        const {
            noDec,
            listDeclarant,
            errorsList,
            isError,
            errorSaisie,
            arrayRevenus,
            isExist,
            openModal,
            addedFieldId,
            openModalPreuve,
            addedFieldIdPreuve,
        } = this.state
        const falseBool = false
        return (
            <div style={{ paddingTop: '1em' }}>
                <SubTitle label={intl.formatMessage({ id: 'revenus' })} />
                <FormGroup>
                    <div className="centerDiv">
                        <Grid container>
                            {arrayRevenus.map((child, index) => {
                                return (
                                    <Grid
                                        container
                                        key={intl.formatMessage({
                                            id: 'revenus',
                                        })}
                                    >
                                        <Grid container>
                                            <ItemTitle
                                                label={`
                                                        ${intl.formatMessage({
                                                            id: 'revenue',
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
                                                    `revenue_${index}`
                                                ] !== undefined
                                                    ? errorsList[
                                                          `revenue_${index}`
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
                                categorie: 'RefNatureRevenue',
                            }}
                            id={addedFieldId}
                            fieldName="natureRevenue"
                        />
                        <PopupAutre
                            openModal={openModalPreuve}
                            onClickAway={this.closeModal}
                            AddedField={this.getAddedField}
                            payload={{
                                publier: false,
                                categorie: 'RefPreuveJus',
                            }}
                            id={addedFieldIdPreuve}
                            fieldName="preuveJustificative"
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
                                {arrayRevenus.length > 1 && (
                                    <ButtonPlus
                                        disabled={falseBool}
                                        color="primary"
                                        fn={this.subRevenus}
                                        ariaLabel="delete"
                                    />
                                )}
                                {!noDec && !isExist && (
                                    <ButtonPlus
                                        ariaLabel="add"
                                        disabled={errorSaisie || noDec}
                                        color="primary"
                                        fn={this.addRevenusFn}
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
    getRevenusReq: id => dispatch(getRevenusActions.getRevenusRequest(id)),
    addRevenusReq: payload =>
        dispatch(addRevenusActions.addRevenusRequest(payload)),
    updateRevenusReq: revenue =>
        dispatch(updateRevenusActions.updateRevenusRequest(revenue)),
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
    stepDeclaration: state.stepSaisie.stepDeclaration,
    step: state.stepSaisie.step,
    listResponsableRevenus:
        state.declarationGrab.getResponsableRevenus.response,
    lng: state.info.language,
    responseAdd: state.declarationGrab.decBien.revenus.addRevenus.response,
    responseEdit: state.declarationGrab.decBien.revenus.updateRevenus.response,
    getRevenus: state.declarationGrab.decBien.revenus.getRevenus.response,
    getVehicules: state.declarationGrab.decBien.vehicules.getVehicules.response,
    getFonts: state.declarationGrab.decBien.fonts.getFonts.response,
    getPrets: state.declarationGrab.decBien.prets.getPrets.response,
    getSpeces: state.declarationGrab.decBien.speces.getSpeces.response,
    getPartSocials:
        state.declarationGrab.decBien.partSocials.getPartSocials.response,
    getActions: state.declarationGrab.decBien.actions.getActions.response,
    getImmeubles: state.declarationGrab.decBien.immeubles.getImmeubles.response,
    getAnimaux: state.declarationGrab.decBien.animaux.getAnimaux.response,
    getAssurances:
        state.declarationGrab.decBien.assurances.getAssurances.response,
    getObjSpeciaux:
        state.declarationGrab.decBien.objSpeciaux.getObjSpeciaux.response,
    getMontants: state.declarationGrab.decBien.montants.getMontants.response,
    getActConjoint:
        state.declarationGrab.interets.actConjoint.getActConjoint.response,
    getCadeaux: state.declarationGrab.interets.cadeaux.getCadeaux.response,
    getEtudes: state.declarationGrab.interets.etudes.getEtudes.response,
    getMembres: state.declarationGrab.interets.membres.getMembres.response,
    getLiberale: state.declarationGrab.interets.liberale.getLiberale.response,
    getSalarie: state.declarationGrab.interets.salarie.getSalarie.response,
    getEnfant:
        state.declarationGrab.enfantsMineur.getEnfantMineurDeclaration.response,
    getConjoint: state.declarationGrab.conjoint.getConjointDeclaration.response,
})

/**
 *  Inialisation
 */
Index.defaultProps = {
    listResponsableRevenus: null,
    getRevenus: null,
    getVehicules: null,
    getFonts: null,
    getPrets: null,
    getSpeces: null,
    getPartSocials: null,
    getActions: null,
    getImmeubles: null,
    getAnimaux: null,
    getAssurances: null,
    getObjSpeciaux: null,
    getMontants: null,
    getActConjoint: null,
    getCadeaux: null,
    getEtudes: null,
    getMembres: null,
    getLiberale: null,
    getSalarie: null,
    getEnfant: null,
    getConjoint: null,
    allReferenciels: {},
    responseAdd: null,
    responseEdit: null,
}
/**
 *  declaration des props
 */
Index.propTypes = {
    getRevenusReq: PropTypes.func.isRequired,
    setDisabled: PropTypes.func.isRequired,
    responseAdd: PropTypes.object,
    responseEdit: PropTypes.object,
    addRevenusReq: PropTypes.func.isRequired,
    getResponsableBienReq: PropTypes.func.isRequired,
    updateRevenusReq: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    getRevenus: PropTypes.object,
    getVehicules: PropTypes.object,
    getFonts: PropTypes.object,
    getPrets: PropTypes.object,
    getSpeces: PropTypes.object,
    getPartSocials: PropTypes.object,
    getActions: PropTypes.object,
    getImmeubles: PropTypes.object,
    getAnimaux: PropTypes.object,
    getAssurances: PropTypes.object,
    getObjSpeciaux: PropTypes.object,
    getMontants: PropTypes.object,
    getActConjoint: PropTypes.object,
    getCadeaux: PropTypes.object,
    getEtudes: PropTypes.object,
    getMembres: PropTypes.object,
    getLiberale: PropTypes.object,
    getSalarie: PropTypes.object,
    getEnfant: PropTypes.object,
    getConjoint: PropTypes.object,
    history: PropTypes.object.isRequired,
    /* getResponsableBienReq: PropTypes.func.isRequired, */
    allReferenciels: PropTypes.object,
    listResponsableRevenus: PropTypes.object,
    lng: PropTypes.string.isRequired,
    stepDeclaration: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
