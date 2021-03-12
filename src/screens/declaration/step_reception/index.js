/* eslint-disable radix */
import React from 'react'
import { Grid, Divider, FormGroup } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import { injectIntl } from 'react-intl'
import getDeclarantActions from '../../../redux/declaration/getDeclarantByCinOrPass'
import getDeclarantionActions from '../../../redux/declaration/addDeclaration'
import getAllReferenceActions from '../../../redux/referencial/getAllReferencial'
import alertActions from '../../../redux/alert'
import RenderForm from '../../../components/declaration/step_reception/declarationForm'
import PageTitle from '../../../components/ui/pageTitle'
import ButtonComponent from '../../../components/ui/button'
import PopupAutre from '../../../components/declaration/step_grab/popupAutre'

/**
 * Declaration Reception
 *
 * @class Index
 * @extends {React.Component}
 */
class Index extends React.Component {
    static propTypes = {
        allReferenciels: PropTypes.object,
        lng: PropTypes.string.isRequired,
        response: PropTypes.object,
        declarantExist: PropTypes.object,
        intl: PropTypes.object.isRequired,
        declarant: PropTypes.object,
        history: PropTypes.shape({
            goBack: PropTypes.func.isRequired,
        }).isRequired,
        getDeclarantByCinOrPass: PropTypes.func.isRequired,
        addDeclarantionReq: PropTypes.func.isRequired,
        alertShow: PropTypes.func.isRequired,
    }

    static defaultProps = {
        allReferenciels: {},
        response: null,
        declarantExist: null,
        declarant: null,
    }

    /**
     * Creates an instance of Index.
     *
     * @param {*} props
     * @memberof Index
     */
    constructor(props) {
        super(props)
        this.state = {
            isExist: false,
            disable: false,
            isError: false,
            errorsList: {},
            isEditDeclaration: false,
            atteste: false,
            decBien: false,
            decChildren: false,
            decConjoint: false,
            decIntr: false,
            itemToSend: [
                'gouvernoratResidence',
                'delegationResidence',
                'nationalite',
                'gouvernoratEtablissement',
                'delegationEtablissement',
            ],
            payloadState: {},
            existDeclarant: props.declarantExist,
            openModalLieuNaissance: false,
            addedFieldIdLieuNaissance: 0,
            openModalEtablissement: false,
            addedFieldIdEtablissement: 0,
            openModalGouvernoratResidence: false,
            addedFieldIdGouvernoratResidence: 0,
            openModalCodePostaleResidence: false,
            addedFieldIdCodePostaleResidence: 0,
            openModalDelegationResidence: false,
            addedFieldIdDelegationResidence: 0,
            openModalGouvernoratEtablissement: false,
            addedFieldIdGouvernoratEtablissement: 0,
            openModalCodePostaleEtablissement: false,
            addedFieldIdCodePostaleEtablissement: 0,
            openModalDelegationEtablissement: false,
            addedFieldIdDelegationEtablissement: 0,
        }

        this.payload = {}
    }

    /* life cycle */
    /**
     *
     *
     * @param {*} nextProps
     * @memberof
     */
    componentWillReceiveProps(nextProps) {
        const { alertShow, declarant } = this.props
        /* test type declaration */
        if (
            this.payload.typeDeclaration === 'premiere declaration' &&
            nextProps.response &&
            nextProps.response.data &&
            nextProps.response.data.declarant
        ) {
            alertShow(true, {
                warning: false,
                info: false,
                error: true,
                success: false,
                title: 'تذكير',
                message: 'المصرح موجود لا يمكن أن يكون نوع التصريح أول تصريح',
            })
            this.setState({ isError: true })
        }
        /* test error */
        if (
            nextProps.response &&
            nextProps.response.data &&
            nextProps.response.data.status === 'error'
        ) {
            const errorsList = {}
            try {
                Object.keys(nextProps.response.data.data).forEach(key => {
                    const item = nextProps.response.data.data[key]
                    if (item) {
                        const errorText = item.ar
                        errorsList[key] = errorText
                    }
                    const errorText = item.ar
                    if (this.payload.numeroResidence === undefined)
                        errorsList.numeroResidence = errorText
                    if (this.payload.rueResidence === undefined)
                        errorsList.rueResidence = errorText
                })
            } catch (e) {
                console.log(e)
            }
            this.setState({ isError: true, errorsList })
        }

        /* test if declarant exist */
        if (nextProps.declarant && nextProps.declarant !== declarant) {
            this.payload.nom = nextProps.declarant.data.nomAr
            this.payload.prenomTripartite =
                nextProps.declarant.data.prenomTripartiteAr
            const objDecl = _.omit(nextProps.declarant.data, [
                'id',
                'codeInsc',
                'dateInscription',
                'numCin',
                'nomFr',
                'nomAr',
                'prenomTripartiteFr',
                'prenomTripartiteAr',
                'username',
                'statut',
                'enable',
                'firstLogin',
                'userRoles',
            ])
            Object.assign(this.payload, objDecl)
            this.setObjectAfterFilter(this.payload)
            this.payload.declarant = nextProps.declarant.data.id
            const adresse = this.payload.adresseResidence.split(' ')
            this.payload.rueResidence = ''
            /* test sur input adresse */
            // eslint-disable-next-line array-callback-return
            adresse.reverse().map((index, key) => {
                if (key === 0) this.payload.numeroResidence = index
                else
                    this.payload.rueResidence = `${index}${' '}${
                        this.payload.rueResidence
                    }`
            })
            delete this.payload.typeDeclaration
            const errorsList = {}
            Object.keys(this.payload).forEach(key => {
                if (
                    key === 'categorie' ||
                    key === 'fonction' ||
                    key === 'ministere' ||
                    key === 'etablissement' ||
                    key === 'nationalite'
                ) {
                    errorsList[key] = ''
                } else {
                    const errorText = 'إعادة إدخال البيانات'
                    errorsList[key] = errorText
                }
                if (this.payload.numeroResidence === undefined)
                    errorsList.numeroResidence = 'إعادة إدخال البيانات'
                if (this.payload.rueResidence === undefined)
                    errorsList.rueResidence = 'إعادة إدخال البيانات'
            })
            this.setState({
                isExist: true,
                payloadState: this.payload,
                existDeclarant: true,
                isError: true,
                errorsList: {
                    ...errorsList,
                    numCin: 'المستخدم موجود',
                    typeDeclaration: 'إعادة إدخال البيانات',
                },
            })
        }
    }

    /* functions */

    /**
     * Set object after filter
     *
     * @param {object} spy
     * @memberof Index
     */
    setObjectAfterFilter = spy => {
        const dec = spy
        Object.keys(spy).forEach(key => {
            if (spy[key] && typeof spy[key] !== 'string') {
                dec[key] = dec[key].id
            }
        })
        return dec
    }

    /**
     * On change number tel
     *
     * @param {string} tel
     * @param {boolean} status
     * @memberof Index
     */
    onChangeNumberTel = (tel, status) => {
        if (status) this.payload.tel = tel
        else {
            delete this.payload.tel
        }
        this.setState({ payloadState: this.payload })
    }

    /**
     * Set check
     *
     * @param {strig} name
     * @param {boolean} checked
     * @memberof Index
     */
    /**
     * check radio bouton
     *
     * @memberof
     */
    setCheck = (name, checked) => {
        this.setState({ [name]: checked })
    }

    /**
     * Field change hander
     *
     * @param {object} target
     * @param {strig} nameInput
     * @param {number} tunNatioId
     * @memberof Index
     */
    /**
     * set Payload
     *
     * @memberof
     */
    fieldChangedHandler = (
        { target: { name, value } },
        nameInput,
        tunNatioId,
        id
    ) => {
        const { itemToSend, errorsList } = this.state
        let valueChanged = value

        if (nameInput === 'nationalite') {
            if (value !== tunNatioId) {
                delete this.payload.numCin
            } else {
                delete this.payload.numPassport
            }
            this.resetCurrentData()
        }
        if (name === 'typeDeclaration')
            if (valueChanged === 'changement substantiel')
                this.setState({ isEditDeclaration: true })
            else this.setState({ isEditDeclaration: false })
        if (name === 'numCin') {
            valueChanged = value.toString()
            if (valueChanged.length !== 8)
                this.setState({
                    isError: true,
                    errorsList: {
                        ...errorsList,
                        numCin: 'الرجاء إدخال 8 أرقام',
                    },
                })
            else
                this.setState({
                    isError: false,
                    errorsList: delete errorsList.numCin,
                })
            this.resetCurrentData()
        }
        /* test sur input passport */
        if (name === 'numPassport') this.resetCurrentData()
        if (_.includes(itemToSend, name)) this.setState({ [name]: value })
        this.payload[name] = valueChanged
        /* test sur popup autre */
        if (value === undefined && name === 'adresseNaissance')
            this.setState({
                openModalLieuNaissance: true,
                addedFieldIdLieuNaissance: id,
            })
        if (value === undefined && name === 'etablissement')
            this.setState({
                openModalEtablissement: true,
                addedFieldIdEtablissement: id,
            })
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
        if (value === undefined && name === 'gouvernoratEtablissement')
            this.setState({
                openModalGouvernoratEtablissement: true,
                addedFieldIdGouvernoratEtablissement: id,
            })
        if (value === undefined && name === 'delegationEtablissement')
            this.setState({
                openModalDelegationEtablissement: true,
                addedFieldIdDelegationEtablissement: id,
            })
        if (value === undefined && name === 'codePostaleEtablissement')
            this.setState({
                openModalCodePostaleEtablissement: true,
                addedFieldIdCodePostaleEtablissement: id,
            })
        this.setState({ payloadState: this.payload })
    }

    /**
     * Cancel declaration
     *
     * @memberof Index
     */
    cancelDeclaration = () => {
        const { history } = this.props
        if (Object.keys(this.payload).length === 0) {
            history.goBack()
        } else {
            this.resetForm()
        }
    }

    /**
     * reset current data except num cin,nationalite,typeDeclaration
     *
     * @memberof Index
     */
    resetCurrentData = () => {
        const { numCin, nationalite, typeDeclaration } = this.payload
        this.payload = { numCin, nationalite, typeDeclaration }
        this.setState({
            payloadState: this.payload,
            isExist: false,
            existDeclarant: false,
        })
    }

    /**
     * Reset form
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
        this.setState({
            payloadState: {},
            isExist: false,
            existDeclarant: false,
        })
    }

    /**
     * Add declaration
     *
     * @memberof Index
     */
    addDeclaration = () => {
        const { alertShow, addDeclarantionReq } = this.props
        const { error } = this.state
        if (error)
            alertShow(true, {
                warning: false,
                info: false,
                error: true,
                success: false,
                title: 'تذكير',
                message: 'يرجى معالجة الأخطاء',
            })
        else {
            if (
                this.payload.numeroResidence !== undefined &&
                this.payload.rueResidence !== undefined
            )
                this.payload.adresseResidence = `${'\u202A'}${
                    this.payload.rueResidence
                } ${'\u202C'}${this.payload.numeroResidence}`
            addDeclarantionReq(this.payload)
        }
    }

    /**
     * set value for popup autre
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
     * close modal popup autre
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
            openModalLieuNaissance: false,
            openModalEtablissement: false,
            openModalGouvernoratResidence: false,
            openModalDelegationResidence: false,
            openModalCodePostaleResidence: false,
            openModalGouvernoratEtablissement: false,
            openModalDelegationEtablissement: false,
            openModalCodePostaleEtablissement: false,
        })
    }

    /* render */
    /**
     *
     *
     * @returns
     * @memberof Actions
     */
    render() {
        const {
            allReferenciels,
            lng,
            intl,
            getDeclarantByCinOrPass,
        } = this.props
        const {
            isError,
            errorsList,
            isExist,
            disable,
            atteste,
            decBien,
            decChildren,
            decConjoint,
            decIntr,
            isEditDeclaration,
            payloadState,
            existDeclarant,
            openModalLieuNaissance,
            addedFieldIdLieuNaissance,
            openModalEtablissement,
            addedFieldIdEtablissement,
            openModalGouvernoratResidence,
            addedFieldIdGouvernoratResidence,
            openModalCodePostaleResidence,
            addedFieldIdCodePostaleResidence,
            openModalDelegationResidence,
            addedFieldIdDelegationResidence,
            openModalGouvernoratEtablissement,
            addedFieldIdGouvernoratEtablissement,
            openModalCodePostaleEtablissement,
            addedFieldIdCodePostaleEtablissement,
            openModalDelegationEtablissement,
            addedFieldIdDelegationEtablissement,
        } = this.state
        const verifChecks =
            !atteste || !decBien || !decChildren || !decConjoint || !decIntr
        return (
            <div className="ctn__declataion">
                <PageTitle label="إضافة تصريح" />
                {[] && (
                    <FormGroup>
                        <div className="centerDiv">
                            <Grid container>
                                <RenderForm
                                    getDeclarantByCinOrPass={
                                        getDeclarantByCinOrPass
                                    }
                                    lng={lng}
                                    intl={intl}
                                    allReferenciels={allReferenciels}
                                    onChangeNumberTel={this.onChangeNumberTel}
                                    setCheck={this.setCheck}
                                    isExist={isExist}
                                    isEditDeclaration={isEditDeclaration}
                                    payload={payloadState}
                                    isError={isError}
                                    errorsList={errorsList}
                                    fieldChangedHandler={
                                        this.fieldChangedHandler
                                    }
                                    declarantExist={existDeclarant}
                                />
                            </Grid>
                            <PopupAutre
                                openModal={openModalLieuNaissance}
                                onClickAway={this.closeModal}
                                AddedField={this.getAddedField}
                                payload={{
                                    publier: false,
                                    categorie: 'RefGouvernorat',
                                }}
                                id={addedFieldIdLieuNaissance}
                                fieldName="adresseNaissance"
                            />
                            <PopupAutre
                                openModal={openModalEtablissement}
                                onClickAway={this.closeModal}
                                AddedField={this.getAddedField}
                                payload={{
                                    publier: false,
                                    categorie: 'RefEtablissement',
                                    parent: {
                                        id:
                                            payloadState &&
                                            payloadState.ministere,
                                    },
                                }}
                                id={addedFieldIdEtablissement}
                                fieldName="etablissement"
                            />
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
                            <PopupAutre
                                openModal={openModalGouvernoratEtablissement}
                                onClickAway={this.closeModal}
                                AddedField={this.getAddedField}
                                payload={{
                                    publier: false,
                                    categorie: 'RefGouvernorat',
                                }}
                                id={addedFieldIdGouvernoratEtablissement}
                                fieldName="gouvernoratEtablissement"
                            />
                            <PopupAutre
                                openModal={openModalDelegationEtablissement}
                                onClickAway={this.closeModal}
                                AddedField={this.getAddedField}
                                payload={{
                                    publier: false,
                                    categorie: 'RefDelegation',
                                    parent: {
                                        id:
                                            payloadState &&
                                            payloadState.gouvernoratEtablissement,
                                    },
                                }}
                                id={addedFieldIdDelegationEtablissement}
                                fieldName="delegationEtablissement"
                            />
                            <PopupAutre
                                openModal={openModalCodePostaleEtablissement}
                                onClickAway={this.closeModal}
                                AddedField={this.getAddedField}
                                payload={{
                                    publier: false,
                                    categorie: 'RefCodePostale',
                                    parent: {
                                        id:
                                            payloadState &&
                                            payloadState.delegationEtablissement,
                                    },
                                }}
                                id={addedFieldIdCodePostaleEtablissement}
                                fieldName="codePostaleEtablissement"
                            />
                            <div style={{ textAlign: 'center', padding: 20 }}>
                                {Object.keys(this.payload).length > 0 &&
                                    verifChecks && (
                                        <span
                                            style={{
                                                color: 'red',
                                                fontSize: '13px',
                                            }}
                                        >
                                            {' '}
                                            يرجى تحديد كل الحقول الأتية{' '}
                                        </span>
                                    )}
                                <Divider />
                                <div>
                                    <ButtonComponent
                                        disabled={verifChecks}
                                        color="secondary"
                                        type="contained"
                                        size="medium"
                                        label="تأكيد"
                                        clicked={this.addDeclaration}
                                    />
                                    <ButtonComponent
                                        disabled={disable}
                                        color="secondary"
                                        type="contained"
                                        label="إلغاء"
                                        size="medium"
                                        clicked={this.cancelDeclaration}
                                    />
                                </div>
                            </div>
                        </div>
                    </FormGroup>
                )}
            </div>
        )
    }
}

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = state => {
    return {
        response: state.declarationReception.addDeclaration.response,
        Received: state.declarationReception.getReceived.response,
        declarant: state.declarationReception.getDeclarantByCinOrPass.response,
        declarantRes: state.declarationReception.addDeclarant.response,
        allReferenciels: state.referencial.allReferencials.response,
        lng: state.info.language,
        declarantExist:
            state.declarationReception.getDeclarantByCinOrPass.response,
    }
}
// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getDeclarantByCinOrPass: payload =>
        dispatch(getDeclarantActions.getDeclarantByCinOrPassRequest(payload)),
    addDeclarantionReq: payload =>
        dispatch(getDeclarantionActions.addDeclarationRequest(payload)),
    getAllReferentiels: () =>
        dispatch(getAllReferenceActions.getAllReferenceRequest()),
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
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
