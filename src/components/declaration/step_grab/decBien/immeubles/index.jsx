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
import getImmeublesActions from '../../../../../redux/declaration_grab/bien/immeubles/getImmeubles/index'
import addImmeublesActions from '../../../../../redux/declaration_grab/bien/immeubles/addImmeubles/index'
import updateImmeublesActions from '../../../../../redux/declaration_grab/bien/immeubles/updateImmeubles/index'
// import getCodePostalByGovActions from '../../../../../redux/referencial/getCodePostalByGov'
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
            arrayImmeubles: [{}],
            errorSaisie: true,
            isExist: false,
            isError: false,
            errorsList: {},
            listDeclarant: [],
            // listCodePostalByGov: [],
            openModalType: false,
            openModalMoyen: false,
            openModalStatut: false,
            addedFieldIdType: 0,
            addedFieldIdMoyen: 0,
            addedFieldIdStatut: 0,
            openModalGouvernoratResidence: false,
            addedFieldIdGouvernoratResidence: 0,
            openModalCodePostaleResidence: false,
            addedFieldIdCodePostaleResidence: 0,
            openModalDelegationResidence: false,
            addedFieldIdDelegationResidence: 0,
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
        const { getResponsableBienReq, history, getImmeublesReq } = this.props
        const { dataDeclaration } = history.location.state
        getResponsableBienReq(dataDeclaration.id)
        getImmeublesReq(dataDeclaration.id)
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
            getImmeublesReq,
            responseAdd,
            responseEdit,
            getImmeubles,
            stepDeclaration,
            listResponsableRevenus,
        } = this.props
        /* get responsable Index et Index  */
        const { dataDeclaration } = history.location.state
        if (
            nextProps.stepDeclaration !== stepDeclaration &&
            nextProps.stepDeclaration === 1 &&
            nextProps.step === 2
        ) {
            getImmeublesReq(dataDeclaration.id)
        }
        /* get responsable revenus  */
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
        /* get Immeuble */
        if (
            nextProps.getImmeubles !== getImmeubles &&
            nextProps.getImmeubles.data.length !== 0
        ) {
            if (nextProps.getImmeubles.data.length === 0) {
                this.setState({ isError: false, errorsList: {} })
            } else {
                this.setArrayImmeubles(nextProps.getImmeubles.data)
                this.setState({
                    isExist: true,
                    errorSaisie: false,
                    isError: false,
                    errorsList: {},
                    noDec: nextProps.getImmeubles.data[0].nothingToDeclare,
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

        // /* get code Postal */
        // if (nextProps.listCodePostal && nextProps.listCodePostal.length > 0)
        //     this.setState({ listCodePostalByGov: nextProps.listCodePostal })
        // else this.setState({ listCodePostalByGov: [] })
    }

    /* functions */

    /**
     *
     *
     * @memberof Animaux
     */

    setArrayImmeubles = resImmeubles => {
        const FinalArray = []
        resImmeubles.forEach(immeuble => {
            const objImmeuble = _.omit(immeuble, [
                'qrCode',
                'publierPartProprietaire',
                'publierImmatriculationFonciere',
                'publierStatutJuridique',
                'publierValeurChiffre',
                'publierValeur',
                'publierMoyenAcquisation',
                'publierDateAcquisation',
                'publierAdress',
                'publierSurface',
                'publierType',
                'publierNom',
                'status',
                'publishedAll',
                'publierNomRubrique',
            ])
            const dec = objImmeuble
            Object.keys(objImmeuble).forEach(key => {
                if (objImmeuble[key] && typeof objImmeuble[key] === 'object') {
                    dec[key] = dec[key].id
                }
            })
            FinalArray.push(dec)
        })
        this.setState({ arrayImmeubles: FinalArray })
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
        this.setState({ arrayImmeubles: [{}] })
    }

    /**
     * retourner pour la dernière page
     *
     * @memberof
     */
    cancelForm = () => {
        const { history } = this.props
        const { arrayImmeubles } = this.state
        if (Object.keys(arrayImmeubles[0]).length !== 0) {
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
        // const { getCodePostalByGovReq } = this.props
        const { arrayImmeubles } = this.state
        // if (name === 'gouvernorat') getCodePostalByGovReq(value)
        if (value === undefined && name === 'moyenAcquisation')
            this.setState({ openModalMoyen: true, addedFieldIdMoyen: id })
        if (value === undefined && name === 'statutJuridique')
            this.setState({ openModalStatut: true, addedFieldIdStatut: id })
        if (value === undefined && name === 'type')
            this.setState({ openModalType: true, addedFieldIdType: id })
        if (value === undefined && name === 'gouvernorat')
            this.setState({
                openModalGouvernoratResidence: true,
                addedFieldIdGouvernoratResidence: id,
            })
        if (value === undefined && name === 'delegation')
            this.setState({
                openModalDelegationResidence: true,
                addedFieldIdDelegationResidence: id,
            })
        if (value === undefined && name === 'codePostale')
            this.setState({
                openModalCodePostaleResidence: true,
                addedFieldIdCodePostaleResidence: id,
            })
        if (value === '') delete arrayImmeubles[id][name]
        else arrayImmeubles[id][name] = value
        this.setState({ arrayImmeubles }, () => {
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
     * @memberof Index
     */
    addImmeublesFn = () => {
        const { arrayImmeubles } = this.state
        this.setState({
            arrayImmeubles: [...arrayImmeubles, {}],
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
                Object.keys(item).length === 13 ||
                (Object.keys(item).length === 15 &&
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
        const { arrayImmeubles } = this.state
        return arrayImmeubles
    }

    /**
     * ajouter
     *
     * @memberof
     */
    submitAdd = () => {
        const { arrayImmeubles, noDec, isExist } = this.state
        const { addImmeublesReq, updateImmeublesReq, history } = this.props
        const { dataDeclaration } = history.location.state
        const declaration = dataDeclaration.id

        const list = arrayImmeubles.map(immeuble => {
            const immeubleSend = immeuble
            immeubleSend.declaration = declaration
            immeubleSend.nothingToDeclare = noDec
            return immeubleSend
        })
        if (!isExist) addImmeublesReq(list)
        else updateImmeublesReq(list)
    }

    /**
     * suppression sous roubrique
     *
     * @memberof
     */
    subImmeubles = () => {
        const { arrayImmeubles } = this.state
        this.setState({
            arrayImmeubles: arrayImmeubles.slice(0, arrayImmeubles.length - 1),
            errorSaisie: false,
        })
    }

    /**
     * fermer modal
     *
     * @memberof Actions
     */
    closeModal = () => {
        this.setState({
            openModalMoyen: false,
            openModalStatut: false,
            openModalType: false,
            openModalGouvernoratResidence: false,
            openModalDelegationResidence: false,
            openModalCodePostaleResidence: false,
        })
    }

    /**
     * payload popup autre
     *
     * @memberof Actions
     */
    getAddedField = ({ name, value }, id) => {
        const { arrayImmeubles } = this.state
        arrayImmeubles[id][name] = value
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
            // listCodePostalByGov,
            errorsList,
            isError,
            errorSaisie,
            arrayImmeubles,
            isExist,
            openModalMoyen,
            addedFieldIdMoyen,
            openModalStatut,
            addedFieldIdStatut,
            openModalType,
            addedFieldIdType,
            openModalGouvernoratResidence,
            addedFieldIdGouvernoratResidence,
            openModalCodePostaleResidence,
            addedFieldIdCodePostaleResidence,
            openModalDelegationResidence,
            addedFieldIdDelegationResidence,
        } = this.state
        const falseBool = false
        return (
            <div style={{ paddingTop: '1em' }}>
                <SubTitle label={intl.formatMessage({ id: 'immeubles' })} />
                <FormGroup>
                    <div className="centerDiv">
                        <Grid container>
                            {arrayImmeubles.map((child, index) => {
                                return (
                                    <Grid
                                        container
                                        key={intl.formatMessage({
                                            id: 'immeubles',
                                        })}
                                    >
                                        <Grid container>
                                            <ItemTitle
                                                label={`
                                                        ${intl.formatMessage({
                                                            id: 'immeuble',
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
                                            // listCodePostalByGov={
                                            //     listCodePostalByGov
                                            // }
                                            isError={isError}
                                            errorsList={
                                                errorsList[
                                                    `immeuble_${index}`
                                                ] !== undefined
                                                    ? errorsList[
                                                          `immeuble_${index}`
                                                      ]
                                                    : {}
                                            }
                                            fieldChangedHandler={
                                                this.fieldChangedHandler
                                            }
                                        />
                                        <PopupAutre
                                            openModal={
                                                openModalGouvernoratResidence
                                            }
                                            onClickAway={this.closeModal}
                                            AddedField={this.getAddedField}
                                            payload={{
                                                publier: false,
                                                categorie: 'RefGouvernorat',
                                            }}
                                            id={
                                                addedFieldIdGouvernoratResidence
                                            }
                                            fieldName="gouvernorat"
                                        />
                                        <PopupAutre
                                            openModal={
                                                openModalDelegationResidence
                                            }
                                            onClickAway={this.closeModal}
                                            AddedField={this.getAddedField}
                                            payload={{
                                                publier: false,
                                                categorie: 'RefDelegation',
                                                parent: {
                                                    id:
                                                        arrayImmeubles &&
                                                        arrayImmeubles[index]
                                                            .gouvernorat,
                                                },
                                            }}
                                            id={addedFieldIdDelegationResidence}
                                            fieldName="delegation"
                                        />
                                        <PopupAutre
                                            openModal={
                                                openModalCodePostaleResidence
                                            }
                                            onClickAway={this.closeModal}
                                            AddedField={this.getAddedField}
                                            payload={{
                                                publier: false,
                                                categorie: 'RefCodePostale',
                                                parent: {
                                                    id:
                                                        arrayImmeubles &&
                                                        arrayImmeubles[index]
                                                            .delegation,
                                                },
                                            }}
                                            id={
                                                addedFieldIdCodePostaleResidence
                                            }
                                            fieldName="codePostale"
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
                            openModal={openModalType}
                            onClickAway={this.closeModal}
                            AddedField={this.getAddedField}
                            payload={{
                                publier: false,
                                categorie: 'RefTypeImmeuble',
                            }}
                            id={addedFieldIdType}
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
                        <PopupAutre
                            openModal={openModalStatut}
                            onClickAway={this.closeModal}
                            AddedField={this.getAddedField}
                            payload={{
                                publier: false,
                                categorie: 'RefStatutJurdique',
                            }}
                            id={addedFieldIdStatut}
                            fieldName="statutJuridique"
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
                                {arrayImmeubles.length > 1 && (
                                    <ButtonPlus
                                        disabled={falseBool}
                                        color="primary"
                                        fn={this.subImmeubles}
                                        ariaLabel="delete"
                                    />
                                )}
                                {!noDec && !isExist && (
                                    <ButtonPlus
                                        ariaLabel="add"
                                        disabled={errorSaisie || noDec}
                                        color="primary"
                                        fn={this.addImmeublesFn}
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
    // getCodePostalByGovReq: payload =>
    //     dispatch(getCodePostalByGovActions.getCodePostalByGovRequest(payload)),
    getImmeublesReq: id =>
        dispatch(getImmeublesActions.getImmeublesRequest(id)),
    addImmeublesReq: payload =>
        dispatch(addImmeublesActions.addImmeublesRequest(payload)),
    updateImmeublesReq: immeuble =>
        dispatch(updateImmeublesActions.updateImmeublesRequest(immeuble)),
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
    // listCodePostal: state.referencial.getCodePostalByGov.response,
    step: state.stepSaisie.step,
    getImmeubles: state.declarationGrab.decBien.immeubles.getImmeubles.response,
    stepDeclaration: state.stepSaisie.stepDeclaration,
    responseAdd: state.declarationGrab.decBien.immeubles.addImmeubles.response,
    responseEdit:
        state.declarationGrab.decBien.immeubles.updateImmeubles.response,
})
/**
 *  Inialisation
 */
Index.defaultProps = {
    getImmeubles: null,
    allReferenciels: {},
    // listCodePostal: [],
    listResponsableRevenus: null,
    responseAdd: null,
    responseEdit: null,
}
/**
 *  declaration des props
 */
Index.propTypes = {
    getImmeublesReq: PropTypes.func.isRequired,
    getResponsableBienReq: PropTypes.func.isRequired,
    // getCodePostalByGovReq: PropTypes.func.isRequired,
    addImmeublesReq: PropTypes.func.isRequired,
    updateImmeublesReq: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    getImmeubles: PropTypes.object,
    history: PropTypes.object.isRequired,
    /* getResponsableBienReq: PropTypes.func.isRequired, */
    allReferenciels: PropTypes.object,
    listResponsableRevenus: PropTypes.object,
    // listCodePostal: PropTypes.array,
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
