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
import getObjSpeciauxActions from '../../../../../redux/declaration_grab/bien/objSpeciaux/getObjSpeciaux/index'
import addObjSpeciauxActions from '../../../../../redux/declaration_grab/bien/objSpeciaux/addObjSpeciaux/index'
import updateObjSpeciauxActions from '../../../../../redux/declaration_grab/bien/objSpeciaux/updateObjSpeciaux/index'
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
            arrayObjSpeciaux: [{}],
            errorSaisie: true,
            isExist: false,
            isError: false,
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
        const { getResponsableBienReq, history, getObjSpeciauxReq } = this.props
        const { dataDeclaration } = history.location.state
        getResponsableBienReq(dataDeclaration.id)
        getObjSpeciauxReq(dataDeclaration.id)
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
            getObjSpeciaux,
            getObjSpeciauxReq,
            responseAdd,
            responseEdit,
            stepDeclaration,
            listResponsableRevenus,
        } = this.props
        const { dataDeclaration } = history.location.state
        /* get responsable action  */
        if (
            nextProps.stepDeclaration !== stepDeclaration &&
            nextProps.stepDeclaration === 10 &&
            nextProps.step === 2
        ) {
            getObjSpeciauxReq(dataDeclaration.id)
        }

        /* get responsable Actions  */
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
            nextProps.getObjSpeciaux !== getObjSpeciaux &&
            nextProps.getObjSpeciaux.data.length !== 0
        ) {
            if (nextProps.getObjSpeciaux.data.length === 0) {
                this.setState({ isError: false, errorsList: {} })
            } else {
                this.setArrayObjSpeciaux(nextProps.getObjSpeciaux.data)
                this.setState({
                    isExist: true,
                    errorSaisie: false,
                    isError: false,
                    errorsList: {},
                    noDec: nextProps.getObjSpeciaux.data[0].nothingToDeclare,
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

    setArrayObjSpeciaux = resObjSpeciaux => {
        const FinalArray = []
        resObjSpeciaux.forEach(objSpeciaux => {
            const objObjSpeciaux = _.omit(objSpeciaux, [
                'publierValeurDateAcquisation',
                'publierMoyenAcquisation',
                'publierDateAcquisation',
                'publierNature',
                'publierNom',
                'status',
                'publishedAll',
                'publierNomRubrique',
            ])
            const dec = objObjSpeciaux
            Object.keys(objObjSpeciaux).forEach(key => {
                if (
                    objObjSpeciaux[key] &&
                    typeof objObjSpeciaux[key] === 'object'
                ) {
                    dec[key] = dec[key].id
                }
            })
            FinalArray.push(dec)
        })
        this.setState({ arrayObjSpeciaux: FinalArray })
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
        this.setState({ arrayObjSpeciaux: [{}] })
    }

    /**
     * retourner pour la dernière page
     *
     * @memberof
     */
    cancelForm = () => {
        const { history } = this.props
        const { arrayObjSpeciaux } = this.state
        if (Object.keys(arrayObjSpeciaux[0]).length !== 0) {
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
        if (value === undefined && name === 'nature') {
            this.setState({ openModal: true, addedFieldId: id })
        }
        if (value === undefined && name === 'moyenAcquisation')
            this.setState({ openModalMoyen: true, addedFieldIdMoyen: id })
        const { arrayObjSpeciaux } = this.state
        if (value === '') delete arrayObjSpeciaux[id][name]
        else arrayObjSpeciaux[id][name] = value
        this.setState({ arrayObjSpeciaux }, () => {
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
    addObjSpeciauxFn = () => {
        const { arrayObjSpeciaux } = this.state
        this.setState({
            arrayObjSpeciaux: [...arrayObjSpeciaux, {}],
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
                Object.keys(item).length === 5 ||
                (Object.keys(item).length === 7 &&
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
        const { arrayObjSpeciaux } = this.state
        return arrayObjSpeciaux
    }

    /**
     * ajouter
     *
     * @memberof
     */
    submitAdd = () => {
        const { arrayObjSpeciaux, noDec, isExist } = this.state
        const { addObjSpeciauxReq, updateObjSpeciauxReq, history } = this.props
        const { dataDeclaration } = history.location.state
        const declaration = dataDeclaration.id
        const list = arrayObjSpeciaux.map(objSpeciaux => {
            const objSpeciauxSend = objSpeciaux
            objSpeciauxSend.declaration = declaration
            objSpeciauxSend.nothingToDeclare = noDec
            return objSpeciauxSend
        })
        if (!isExist) addObjSpeciauxReq(list)
        else updateObjSpeciauxReq(list)
    }

    /**
     * suppression sous roubrique
     *
     * @memberof
     */
    subObjs = () => {
        const { arrayObjSpeciaux } = this.state
        this.setState({
            arrayObjSpeciaux: arrayObjSpeciaux.slice(
                0,
                arrayObjSpeciaux.length - 1
            ),
            errorSaisie: false,
        })
    }

    /**
     * payload popup autre
     *
     * @memberof Actions
     */
    getAddedField = ({ name, value }, id) => {
        const { arrayObjSpeciaux } = this.state
        arrayObjSpeciaux[id][name] = value
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
        const { intl, allReferenciels, lng } = this.props
        const {
            noDec,
            listDeclarant,
            errorsList,
            isError,
            errorSaisie,
            arrayObjSpeciaux,
            openModal,
            addedFieldId,
            isExist,
            openModalMoyen,
            addedFieldIdMoyen,
        } = this.state
        const falseBool = false
        return (
            <div style={{ paddingTop: '1em' }}>
                <SubTitle label={intl.formatMessage({ id: 'objSpeciaux' })} />
                <FormGroup>
                    <div className="centerDiv">
                        <Grid container>
                            {arrayObjSpeciaux.map((child, index) => {
                                return (
                                    <Grid
                                        container
                                        key={intl.formatMessage({
                                            id: 'objSpeciaux',
                                        })}
                                    >
                                        <Grid container>
                                            <ItemTitle
                                                label={`
                                                        ${intl.formatMessage({
                                                            id:
                                                                'objSpeciauxNum',
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
                                                    `ObjectPrecieux_${index}`
                                                ] !== undefined
                                                    ? errorsList[
                                                          `ObjectPrecieux_${index}`
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
                                categorie: 'RefNatureObjet',
                            }}
                            id={addedFieldId}
                            fieldName="nature"
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
                                {arrayObjSpeciaux.length > 1 && (
                                    <ButtonPlus
                                        disabled={falseBool}
                                        color="primary"
                                        fn={this.subObjs}
                                        ariaLabel="delete"
                                    />
                                )}
                                {!noDec && !isExist && (
                                    <ButtonPlus
                                        ariaLabel="add"
                                        disabled={errorSaisie || noDec}
                                        color="primary"
                                        fn={this.addObjSpeciauxFn}
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
    getObjSpeciauxReq: id =>
        dispatch(getObjSpeciauxActions.getObjSpeciauxRequest(id)),
    addObjSpeciauxReq: payload =>
        dispatch(addObjSpeciauxActions.addObjSpeciauxRequest(payload)),
    updateObjSpeciauxReq: objSpeciaux =>
        dispatch(
            updateObjSpeciauxActions.updateObjSpeciauxRequest(objSpeciaux)
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
    allReferenciels: state.referencial.allReferencials.response,
    listResponsableRevenus:
        state.declarationGrab.getResponsableRevenus.response,
    lng: state.info.language,
    step: state.stepSaisie.step,
    getObjSpeciaux:
        state.declarationGrab.decBien.objSpeciaux.getObjSpeciaux.response,
    responseAdd:
        state.declarationGrab.decBien.objSpeciaux.addObjSpeciaux.response,
    responseEdit:
        state.declarationGrab.decBien.objSpeciaux.updateObjSpeciaux.response,
    stepDeclaration: state.stepSaisie.stepDeclaration,
})

/**
 *  Inialisation
 */
Index.defaultProps = {
    getObjSpeciaux: null,
    listResponsableRevenus: null,
    allReferenciels: {},
    responseAdd: null,
    responseEdit: null,
}
/**
 *  declaration des props
 */
Index.propTypes = {
    getResponsableBienReq: PropTypes.func.isRequired,
    addObjSpeciauxReq: PropTypes.func.isRequired,
    updateObjSpeciauxReq: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    getObjSpeciauxReq: PropTypes.func.isRequired,
    getObjSpeciaux: PropTypes.object,
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
