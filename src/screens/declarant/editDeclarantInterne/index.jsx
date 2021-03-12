/* eslint-disable radix */
import React from 'react'
import { Grid, Divider, FormGroup } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _, { isEmpty } from 'lodash'
import { injectIntl } from 'react-intl'
import editDeclarantInterneActions from '../../../redux/declarantInterne/editDeclarantInterne'
import getAllReferenceActions from '../../../redux/referencial/getAllReferencial'
import alertActions from '../../../redux/alert'
import RenderForm from '../../../components/declarantInterne/step_reception/declarantInterneForm'
import PageTitle from '../../../components/ui/pageTitle'
import ButtonComponent from '../../../components/ui/button'
import getDeclarantInterneActions from '../../../redux/declarantInterne/getDeclarantById'

/**
 * @class Index
 * @extends {React.Component}
 */
class Index extends React.Component {
    static propTypes = {
        allReferenciels: PropTypes.object,
        lng: PropTypes.string.isRequired,
        response: PropTypes.object,
        intl: PropTypes.object.isRequired,
        declarantData: PropTypes.object,
        history: PropTypes.object.isRequired,
        editDeclarantInterneReq: PropTypes.func.isRequired,
        alertShow: PropTypes.func.isRequired,
        getDeclarantActions: PropTypes.func.isRequired,
    }

    static defaultProps = {
        allReferenciels: {},
        response: null,
        declarantData: null,
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
            verifChecks: false,
            errorsList: {},
            isEditDeclaration: false,
            itemToSend: [
                'gouvernoratResidence',
                'delegationNaissance',
                'delegationResidence',
                'delegationNaissance',
                'nationalite',
                'gouvernoratEtablissement',
                'delegationEtablissement',
                'codePostaleNaissance',
                'codePostaleResidence',
                'codePostaleEtablissement',
            ],
            payloadState: {},
        }
        this.declarantForm = props.history.location.state.dataDeclaration
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
        const { history, getDeclarantActions } = this.props
        const { idDeclaration } = history.location.state
        getDeclarantActions(idDeclaration)
    }

    /* life cycle */
    /**
     *
     *
     * @param {*} nextProps
     * @memberof
     */
    componentWillReceiveProps(nextProps) {
        const { declarantData } = this.props

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

        if (
            nextProps.declarantData &&
            nextProps.declarantData !== declarantData
        ) {
            const objDecl = _.omit(nextProps.declarantData, ['id'])
            Object.assign(this.payload, objDecl)
            this.setObjectAfterFilter(this.payload)
            this.setState({ isExist: true, payloadState: this.payload })
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
        /* test sur input type dec */
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
            this.this.resetCurrentData()
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
     * @memberof Index
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
     * @memberof Index
     */
    editDeclarantInterne = () => {
        const { alertShow, editDeclarantInterneReq, history } = this.props
        const { idDeclaration } = history.location.state
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
            editDeclarantInterneReq({
                id: idDeclaration,
                payload: this.payload,
            })
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
        const { allReferenciels, lng, intl } = this.props
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
                                        clicked={this.editDeclarantInterne}
                                    />
                                    <ButtonComponent
                                        disabled={disable}
                                        color="secondary"
                                        type="contained"
                                        label={
                                            isEmpty(payloadState)
                                                ? 'رجوع'
                                                : 'إلغاء'
                                        }
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
        response: state.declarantInterne.editDeclarantInterne.response,
        Received: state.declarationReception.getReceived.response,
        declarantData: state.declarantInterne.getDeclarantInterne.response,
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
    getDeclarantActions: payload =>
        dispatch(
            getDeclarantInterneActions.getDeclarantInterneRequest(payload)
        ),
    editDeclarantInterneReq: payload =>
        dispatch(
            editDeclarantInterneActions.editDeclarantInterneRequest(payload)
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
)(injectIntl(Index))
