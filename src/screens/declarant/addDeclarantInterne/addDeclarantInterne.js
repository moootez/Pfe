/* eslint-disable radix */
import React from 'react'
import { Grid, Divider, FormGroup } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import { injectIntl } from 'react-intl'
import getDeclarantActions from '../../../redux/declaration/getDeclarantByCinOrPass'
import addDeclarantInterneActions from '../../../redux/declarantInterne/addDeclarantInterne'
import getAllReferenceActions from '../../../redux/referencial/getAllReferencial'
import alertActions from '../../../redux/alert'
import RenderForm from '../../../components/declarantInterne/step_reception/declarantInterneForm'
import PageTitle from '../../../components/ui/pageTitle'
import ButtonComponent from '../../../components/ui/button'

/**
 * Declaration Reception
 *
 * @class addDeclarantInterne
 * @extends {React.Component}
 */
class addDeclarantInterne extends React.Component {
    static propTypes = {
        allReferenciels: PropTypes.object,
        lng: PropTypes.string.isRequired,
        response: PropTypes.object,
        intl: PropTypes.object.isRequired,
        declarant: PropTypes.object,
        history: PropTypes.shape({
            goBack: PropTypes.func.isRequired,
        }).isRequired,
        getDeclarantByCinOrPass: PropTypes.func.isRequired,
        addDeclarantInterneReq: PropTypes.func.isRequired,
        alertShow: PropTypes.func.isRequired,
    }

    static defaultProps = {
        allReferenciels: {},
        response: null,
        declarant: null,
    }

    /**
     * Creates an instance of addDeclarantInterne.
     *
     * @param {*} props
     * @memberof addDeclarantInterne
     */
    constructor(props) {
        super(props)
        this.state = {
            isExist: false,
            disable: false,
            isError: false,
            verifChecks: false,
            errorsList: {},
            isEditDeclaration: false,
            itemToSend: [
                'gouvernorat_residence',
                'delegation_naissance',
                'delegation_residence',
                'delegation_naissance',
                'nationalite',
                'gouvernorat_etablissement',
                'delegation_etablissement',
                'code_postale_naissance',
                'code_postale_residence',
                'code_postale_etablissement',
            ],
            payloadState: {},
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

        /* test error */
        if (
            this.payload.typeDeclaration === 'premiere declaration' &&
            nextProps.response &&
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
        if (nextProps.response && nextProps.response.data.status === 'error') {
            const errorsList = {}
            try {
                Object.keys(nextProps.response.data.data).forEach(key => {
                    const item = nextProps.response.data.data[key]
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

        /* test if declarant exist */

        if (nextProps.declarant && nextProps.declarant !== declarant) {
            this.payload.nomAr = nextProps.declarant.data.nomAr
            this.payload.prenomTripartiteAr =
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
            this.setState({ isExist: true, payloadState: this.payload })
        }
    }

    /* functions */

    /**
     * Set object after filter
     *
     * @param {object} spy
     * @memberof addDeclarantInterne
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
     * @memberof addDeclarantInterne
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
     * @memberof addDeclarantInterne
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
     * @memberof addDeclarantInterne
     */
    /**
     * set Payload
     *
     * @memberof
     */
    fieldChangedHandler = (
        { target: { name, value } },
        nameInput,
        tunNatioId
    ) => {
        const { itemToSend, errorsList } = this.state
        let valueChanged = value
        /* test sur input natiolnalité */
        if (nameInput === 'nationalite') {
            if (value !== tunNatioId) {
                delete this.payload.numCin
            } else {
                delete this.payload.numPassport
            }
            this.resetCurrentData()
        }
        /* test sur input type declaration */
        if (name === 'typeDeclaration')
            if (valueChanged === 'changement substantiel')
                this.setState({ isEditDeclaration: true })
            else this.setState({ isEditDeclaration: false })
        /* test sur input cin */
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
        this.setState({ payloadState: this.payload })
    }

    /**
     * Cancel declaration
     *
     * @memberof addDeclarantInterne
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
     * reset current data except num cin,nationalite
     *
     * @memberof DeclarationReception
     */
    resetCurrentData = () => {
        const { numCin, nationalite } = this.payload
        this.payload = { numCin, nationalite }
        this.setState({
            payloadState: this.payload,
            isExist: false,
        })
    }

    /**
     * Reset form
     *
     * @memberof addDeclarantInterne
     */
    /**
     * retouner objet
     *
     * @memberof
     */
    resetForm = () => {
        this.payload = {}
        this.setState({ payloadState: {}, isExist: false })
    }

    /**
     * Add declaration
     *
     * @memberof addDeclarantInterne
     */
    addDeclarantInterne = () => {
        const { alertShow, addDeclarantInterneReq } = this.props
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
            const payload = Object.assign(this.payload, {
                preview: true,
                role: [],
                source: 'BackOffice',
            })
            addDeclarantInterneReq(payload)
        }
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
            verifChecks,
            isEditDeclaration,
            payloadState,
        } = this.state
        return (
            <div className="ctn__declataion">
                <PageTitle label="تسجيل مصرح" />
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
                                />
                            </Grid>
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
                                        clicked={this.addDeclarantInterne}
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
        response: state.declarantInterne.addDeclarantInterne.response,
        Received: state.declarationReception.getReceived.response,
        declarant: state.declarationReception.getDeclarantByCinOrPass.response,
        declarantRes: [],
        allReferenciels: state.referencial.allReferencials.response,
        lng: state.info.language,
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
    addDeclarantInterneReq: payload =>
        dispatch(
            addDeclarantInterneActions.addDeclarantInterneRequest(payload)
        ),
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
)(injectIntl(addDeclarantInterne))
