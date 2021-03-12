import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Grid, Divider, FormGroup } from '@material-ui/core'
import { injectIntl } from 'react-intl'
import Form from './Form'
import ButtonComponent from '../../../ui/button'
import addConjointActions from '../../../../redux/declaration_grab/conjoint/addConjoint/index'
import updateConjointActions from '../../../../redux/declaration_grab/conjoint/updateConjoint/index'
import getConjointActions from '../../../../redux/declaration_grab/conjoint/getConjoint/index'
import PopupAutre from '../popupAutre'

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
            // noDec: false,
            isError: false,
            errorSaisie: true,
            isExist: false,
            errorsList: {},
            itemToSend: ['nationalite'],
            // listCodePostalByGov: [],
            payloadState: {},
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

    /**
     *
     *
     * @memberof Index
     */
    /* life cycle */

    /**
     *
     *
     * @memberof
     */
    componentDidMount() {
        const { getConjointReq, history } = this.props
        const { dataDeclaration } = history.location.state
        getConjointReq(dataDeclaration.user.id)
    }

    /**
     *
     *
     * @param {*} nextProps
     * @memberof Index
     */
    /**
     *
     *
     * @param {*} nextProps
     * @memberof
     */
    componentWillReceiveProps(nextProps) {
        const {
            // getCodePostalByGovReq,
            getConjoint,
            responseEdit,
            step,
            getConjointReq,
            history,
            responseAdd,
        } = this.props
        const { dataDeclaration } = history.location.state
        if (nextProps.step !== step && nextProps.step === 0) {
            getConjointReq(dataDeclaration.user.id)
        }
        /* get code Postal */
        // if (nextProps.listCodePostal && nextProps.listCodePostal.length > 0)
        //     this.setState({ listCodePostalByGov: nextProps.listCodePostal })
        // else this.setState({ listCodePostalByGov: [] })
        /* ixist conjoint */

        if (
            // !isExist &&
            nextProps.getConjoint !== getConjoint
        ) {
            console.log(nextProps.getConjoint !== getConjoint)
            if (nextProps.getConjoint.data.length === 0) {
                this.setState({
                    errorSaisie: false,
                    payloadState: {},
                    isError: false,
                    errorsList: {},
                })
            } else {
                const objConjoint = _.omit(nextProps.getConjoint.data[0], [
                    'id',
                    'qrCode',
                    'publishedAll',
                    'publierNom',
                    'publierPrenomTripartite',
                    'publierDateNaissance',
                    'publierAdresseResidence',
                    'publierGouvernoratResidence',
                    'publierCodePostaleResidence',
                    'publierNumCin',
                    'publierNumPassport',
                    'publierNationalite',
                    'publierFonction',
                    'publierNomRubrique',
                ])
                Object.assign(this.payload, objConjoint)
                this.setObjectAfterFilter(this.payload)
                // getCodePostalByGovReq(this.payload.gouvernoratResidence)
                this.setState({
                    isExist: true,
                    errorSaisie: false,
                    payloadState: this.payload,
                    // noDec: this.payload.nothingToDeclare,
                    isError: false,
                    errorsList: {},
                    // idConjoint: nextProps.getConjoint.data.id,
                })
            }
        }
        this.renderErreurListForAdd(nextProps, responseAdd)
        this.renderErreurListForEdit(nextProps, responseEdit)
    }

    /**
     * erreur list Edit
     *
     * @memberof Index
     */
    renderErreurListForEdit = (nextProps, responseEdit) => {
        if (
            nextProps.responseEdit !== responseEdit &&
            nextProps.responseEdit.data.status === 'error'
        ) {
            const errorsList = {}
            try {
                Object.keys(nextProps.responseEdit.data.data).forEach(key => {
                    const item = nextProps.responseEdit.data.data[key]
                    if (item) {
                        const errorText = item.ar
                        errorsList[key] = errorText
                    }
                })
            } catch (e) {
                console.log(e)
            }
            this.setState({ isError: true, errorsList })
        }
    }

    /**
     * erreur list add
     *
     * @memberof Index
     */
    renderErreurListForAdd = (nextProps, responseAdd) => {
        if (
            nextProps.responseAdd !== responseAdd &&
            nextProps.responseAdd.data.status === 'error'
        ) {
            const errorsList = {}
            try {
                Object.keys(nextProps.responseAdd.data.data).forEach(key => {
                    const item = nextProps.responseAdd.data.data[key]
                    if (item) {
                        const errorText = item.ar
                        errorsList[key] = errorText
                    }
                })
            } catch (e) {
                console.log(e)
            }
            this.setState({ isError: true, errorsList })
        }
    }

    /* functions */

    /**
     *  filter des key object
     *
     * @memberof Index
     */
    setObjectAfterFilter = spy => {
        const dec = spy
        Object.keys(spy).forEach(key => {
            if (spy[key] && typeof spy[key] === 'object') {
                dec[key] = dec[key].id
            }
        })
        if (dec.numPassport) delete dec.numCin
        else delete dec.numPassport
        return dec
    }

    /**
     * check radio
     *
     * @memberof Index
     */
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
     * set payload
     *
     * @memberof Index
     */
    /**
     * set Payload
     *
     * @memberof
     */
    fieldChangedHandler = ({ target: { name, value } }, id) => {
        const { errorsList, itemToSend } = this.state
        const { intl } = this.props
        if (value) {
            let valueChanged = value
            this.verifValuePopup(value, name, id)
            if (name === 'numCin') {
                valueChanged = value.toString()
                if (valueChanged.length !== 8)
                    this.setState({
                        isError: true,
                        errorsList: {
                            ...errorsList,
                            numCin: intl.formatMessage({ id: 'msgCin' }),
                        },
                    })
                else
                    this.setState({
                        isError: false,
                        errorsList: delete errorsList.numCin,
                    })
            }
            if (_.includes(itemToSend, name)) this.setState({ [name]: value })
            if (value !== '') this.payload[name] = valueChanged
            else delete this.payload[name]
            if (
                (Object.keys(this.payload).length === 9 &&
                    !Object.keys(this.payload).includes('declarant')) ||
                (Object.keys(this.payload).length === 10 &&
                    Object.keys(this.payload).includes('declarant'))
            ) {
                this.setState({
                    errorSaisie: false,
                })
            } else
                this.setState({
                    errorSaisie: true,
                })
            this.setState({ payloadState: this.payload })
        }
    }

    /**
     * verifier valeur popup
     *
     * @memberof Index
     */
    verifValuePopup = (value, name, id) => {
        if (value === undefined && name === 'gouvernoratResidence')
            this.setState({
                openModalGouvernoratResidence: true,
                addedFieldIdGouvernoratResidence: id,
            })
        if (value === undefined && name === 'delegationResidence')
            this.setState({
                openModalDelegationResidence: true,
                addedFieldIdDelegationResidence: id,
            })
        if (value === undefined && name === 'codePostaleResidence')
            this.setState({
                openModalCodePostaleResidence: true,
                addedFieldIdCodePostaleResidence: id,
            })
    }

    /**
     *
     *
     * @memberof Index
     */
    /**
     * retouner objet
     *
     * @memberof
     */
    resetForm = () => {
        this.payload = {}
        this.setState({ payloadState: {} })
    }

    /**
     * rederection à la dernière page
     *
     * @memberof Index
     */
    /**
     * retourner pour la dernière page
     *
     * @memberof
     */
    cancelForm = () => {
        const { history } = this.props
        if (Object.keys(this.payload).length !== 0) {
            this.resetForm()
        } else {
            history.goBack()
        }
    }

    /**
     * ajout conjoint
     *
     * @memberof Index
     */
    addConjoint = () => {
        const {
            addConjointReq,
            history,
            updateConjointReq,
            getConjoint,
        } = this.props
        const { isExist } = this.state
        const { dataDeclaration } = history.location.state
        const declarant = dataDeclaration.user.id
        const obj = { ...this.payload, declarant }

        if (!isExist) {
            addConjointReq(obj)
        } else {
            const idConjoint = getConjoint.data[0].id
            updateConjointReq({ idConjoint, obj })
            // delete this.payload.declarant
        }
    }

    /**
     * fermer modal
     *
     * @memberof Index
     */
    /**
     * fermer modal
     *
     * @memberof Actions
     */
    closeModal = () => {
        this.setState({
            openModalGouvernoratResidence: false,
            openModalDelegationResidence: false,
            openModalCodePostaleResidence: false,
        })
    }

    /**
     *
     *
     * @memberof Index
     */
    /**
     * payload popup autre
     *
     * @memberof Actions
     */
    getAddedField = ({ name, value }) => {
        this.payload[name] = value
        this.setState({ payloadState: this.payload })
        this.closeModal()
    }

    /**
     * On change number tel
     *
     * @param {string} tel
     * @param {boolean} status
     * @memberof DeclarationReceptionCoursDesComptes
     */
    onChangeNumberTel = (tel, status) => {
        if (status) this.payload.tel = tel
        else {
            delete this.payload.tel
        }
        this.setState({ payloadState: this.payload })
    }

    /* render */
    /**
     *
     *
     * @returns
     * @memberof Index
     */
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
            // listCodePostalByGov,
            errorsList,
            // noDec,
            isError,
            errorSaisie,
            payloadState,
            openModalGouvernoratResidence,
            addedFieldIdGouvernoratResidence,
            openModalCodePostaleResidence,
            addedFieldIdCodePostaleResidence,
            openModalDelegationResidence,
            addedFieldIdDelegationResidence,
        } = this.state
        return (
            <div style={{ paddingTop: '1em' }}>
                <FormGroup>
                    <div className="centerDiv">
                        <Grid container>
                            <Form
                                lng={lng}
                                intl={intl}
                                payload={payloadState}
                                // disabled={noDec}
                                // listCodePostalByGov={listCodePostalByGov}
                                allReferenciels={allReferenciels}
                                onChangeNumberTel={this.onChangeNumberTel}
                                tunNatioId={this.tunNatioId}
                                isError={isError}
                                errorsList={errorsList}
                                fieldChangedHandler={this.fieldChangedHandler}
                            />
                        </Grid>
                        <PopupAutre
                            openModal={openModalGouvernoratResidence}
                            onClickAway={this.closeModal}
                            AddedField={this.getAddedField}
                            payload={{
                                publier: false,
                                categorie: 'RefGouvernorat',
                            }}
                            id={addedFieldIdGouvernoratResidence}
                            fieldName="gouvernoratResidence"
                        />
                        <PopupAutre
                            openModal={openModalDelegationResidence}
                            onClickAway={this.closeModal}
                            AddedField={this.getAddedField}
                            payload={{
                                publier: false,
                                categorie: 'RefDelegation',
                                parent: {
                                    id:
                                        payloadState &&
                                        payloadState.gouvernoratResidence,
                                },
                            }}
                            id={addedFieldIdDelegationResidence}
                            fieldName="delegationResidence"
                        />
                        <PopupAutre
                            openModal={openModalCodePostaleResidence}
                            onClickAway={this.closeModal}
                            AddedField={this.getAddedField}
                            payload={{
                                publier: false,
                                categorie: 'RefCodePostale',
                                parent: {
                                    id:
                                        payloadState &&
                                        payloadState.delegationResidence,
                                },
                            }}
                            id={addedFieldIdCodePostaleResidence}
                            fieldName="codePostaleResidence"
                        />
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
                        {/* <Grid
                                item
                                xs={12}
                                sm={12}
                                className="gridItem"
                                style={{ marginTop: '15px' }}
                            >
                                <Check
                                    label={intl.formatMessage({ id: 'rien' })}
                                    name="noDec"
                                    selectedValue={noDec}
                                    onchange={(name, checked) =>
                                        this.setCheck(name, checked)
                                    }
                                />
                            </Grid> */}
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
                                    clicked={this.addConjoint}
                                />
                                <ButtonComponent
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
    // getCodePostalByGovReq: payload =>
    //     dispatch(getCodePostalByGovActions.getCodePostalByGovRequest(payload)),
    addConjointReq: conjoint =>
        dispatch(addConjointActions.addConjointDeclarationsRequest(conjoint)),
    updateConjointReq: conjoint =>
        dispatch(updateConjointActions.updateConjointRequest(conjoint)),
    getConjointReq: id => dispatch(getConjointActions.getConjointRequest(id)),
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
    // listCodePostal: state.referencial.getCodePostalByGov.response,
    lng: state.info.language,
    step: state.stepSaisie.step,
    responseAdd: state.declarationGrab.conjoint.addConjointDeclaration.response,
    responseEdit:
        state.declarationGrab.conjoint.updateConjointDeclaration.response,
    getConjoint: state.declarationGrab.conjoint.getConjointDeclaration.response,
})
/**
 *  Inialisation
 */
Index.defaultProps = {
    getConjoint: null,
    // listCodePostal: null,
    allReferenciels: {},
    responseAdd: null,
    responseEdit: null,
}
/**
 *  declaration des props
 */
Index.propTypes = {
    intl: PropTypes.object.isRequired,
    getConjoint: PropTypes.object,
    history: PropTypes.object.isRequired,
    // getCodePostalByGovReq: PropTypes.func.isRequired,
    allReferenciels: PropTypes.object,
    // listCodePostal: PropTypes.array,
    lng: PropTypes.string.isRequired,
    addConjointReq: PropTypes.func.isRequired,
    updateConjointReq: PropTypes.func.isRequired,
    getConjointReq: PropTypes.func.isRequired,
    responseAdd: PropTypes.object,
    responseEdit: PropTypes.object,
    step: PropTypes.number.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
