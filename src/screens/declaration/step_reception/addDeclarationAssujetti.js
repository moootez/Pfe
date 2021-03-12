/* eslint-disable radix */
import React from 'react'
import { Grid, Divider, FormGroup } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import { injectIntl } from 'react-intl'
import getDeclarantActions from '../../../redux/declaration/getDeclarantByCinOrPass'
import getDeclarantionAssujettiActions from '../../../redux/declaration/addDeclarationAssujetti'
import getAllReferenceActions from '../../../redux/referencial/getAllReferencial'
import alertActions from '../../../redux/alert'
import RenderForm from '../../../components/declaration/step_reception/declarationForm'
import PageTitle from '../../../components/ui/pageTitle'
import ButtonComponent from '../../../components/ui/button'

/**
 * Declaration Reception
 *
 * @class addDeclarationAssujetti
 * @extends {React.Component}
 */
class addDeclarationAssujetti extends React.Component {
    static propTypes = {
        allReferenciels: PropTypes.object,
        lng: PropTypes.string.isRequired,
        response: PropTypes.object,
        intl: PropTypes.object.isRequired,
        declarant: PropTypes.object,
        history: PropTypes.object.isRequired,
        getDeclarantByCinOrPass: PropTypes.func.isRequired,
        addDeclarantionAssujettiReq: PropTypes.func.isRequired,
        alertShow: PropTypes.func.isRequired,
    }

    static defaultProps = {
        allReferenciels: {},
        response: null,
        declarant: null,
    }

    /**
     * Creates an instance of addDeclarationAssujetti.
     *
     * @param {*} props
     * @memberof addDeclarationAssujetti
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
        const { history } = this.props
        const { itemEtablissement } = history.location.state
        this.payload.ministere = itemEtablissement.parent.id
        this.payload.etablissement = itemEtablissement.id
        this.setState({ payloadState: this.payload })
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
        /* test erreur */
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
            this.setState({ isExist: true, payloadState: this.payload })
        }
    }

    /* functions */

    /**
     * Set object after filter
     *
     * @param {object} spy
     * @memberof addDeclarationAssujetti
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
     * @memberof addDeclarationAssujetti
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
     * @memberof addDeclarationAssujetti
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
     * @memberof addDeclarationAssujetti
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

        if (nameInput === 'nationalite') {
            if (value !== tunNatioId) {
                delete this.payload.numCin
            } else {
                delete this.payload.numPassport
            }
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
        }
        if (_.includes(itemToSend, name)) this.setState({ [name]: value })
        this.payload[name] = valueChanged
        this.setState({ payloadState: this.payload })
    }

    /**
     * Cancel declaration
     *
     * @memberof addDeclarationAssujetti
     */
    cancelDeclaration = () => {
        const { history } = this.props
        if (Object.keys(this.payload).length === 2) {
            history.goBack()
        } else {
            this.resetForm()
        }
    }

    /**
     * Reset form
     *
     * @memberof addDeclarationAssujetti
     */
    /**
     * retouner objet
     *
     * @memberof
     */
    resetForm = () => {
        const { history } = this.props
        const { itemEtablissement } = history.location.state
        this.payload = {}
        this.payload.ministere = itemEtablissement.parent.id
        this.payload.etablissement = itemEtablissement.id
        this.setState({ payloadState: this.payload, isExist: false })
    }

    /**
     * Add declaration
     *
     * @memberof addDeclarationAssujetti
     */
    addDeclarationAssujetti = () => {
        const { alertShow, addDeclarantionAssujettiReq } = this.props
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
            addDeclarantionAssujettiReq(this.payload)
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
            atteste,
            decBien,
            decChildren,
            decConjoint,
            decIntr,
            isEditDeclaration,
            payloadState,
        } = this.state
        const verifChecks =
            !atteste || !decBien || !decChildren || !decConjoint || !decIntr
        return (
            <div className="ctn__declataion">
                <PageTitle label="إضافة منخرط" />
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
                                    // tunNatioId={this.tunNatioId}
                                    isError={isError}
                                    errorsList={errorsList}
                                    fieldChangedHandler={
                                        this.fieldChangedHandler
                                    }
                                    // declarantExist
                                    ecran="addDeclarantAssujetti"
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
                                        clicked={this.addDeclarationAssujetti}
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
        response: state.declarationReception.addDeclarationAssujetti.response,
        Received: state.declarationReception.getReceived.response,
        declarant: state.declarationReception.getDeclarantByCinOrPass.response,
        declarantRes: state.declarationReception.addDeclarant.response,
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
    addDeclarantionAssujettiReq: payload =>
        dispatch(
            getDeclarantionAssujettiActions.addDeclarationAssujettiRequest(
                payload
            )
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
)(injectIntl(addDeclarationAssujetti))
