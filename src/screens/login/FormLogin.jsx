import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { connect } from 'react-redux'
import loginActions from '../../redux/login'
import cryptosignActions from '../../redux/certificat/cryptosign'
import getCertifActions from '../../redux/certificat/getCertif'
import fleche from '../../assets/images/fleche.png'
import './Login.css'
import alertActions from '../../redux/alert'

/**
 * interface login
 *
 * @class FormLogin
 * @extends {Component}
 */
class FormLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            visible: false,
            payload: {},
        }
    }

    /* life cycle */
    componentDidMount = () => {
        window.addEventListener('keypress', e => this.verifKey(e))
    }

    /* life cycle */
    /**
     *
     *
     * @param {*} nextProps
     * @memberof
     */
    componentWillReceiveProps() {
        const { loginRequest, onHideAlert } = this.props
        const { email, password } = this.state
        /* test if signature OK */

        setTimeout(() => {
            onHideAlert()
            loginRequest({
                username: email,
                password,
                serialNumberToken: '165075729',
            })
        }, 1000)
    }

    /* life cycle */
    componentWillUnmount() {
        window.removeEventListener('keypress', e => this.verifKey(e))
    }

    /**
     * verifie key to login with bouton entrer
     *
     * @memberof FormLogin
     */
    verifKey = e => {
        if (e.keyCode === 13) {
            this.handleSubmit()
        }
    }

    /**
     * submit certificat
     *
     * @memberof FormLogin
     */
    handleSubmit = () => {
        const { email, password } = this.state
        const {
            getCertifRequest,
            validationCertif,
            loginRequest,
            alertShow,
        } = this.props
        /* test signature OK for login */
        if (validationCertif.response) {
            if (
                validationCertif.response.certificatePathValidity === true &&
                validationCertif.response.certificateValidity === true &&
                validationCertif.response.signatureValidity === true
            )
                loginRequest({
                    username: email,
                    password,
                    serialNumberToken:
                        validationCertif.response.certificateInfo.serialNumber,
                })
            else
                alertShow(true, {
                    warning: false,
                    info: false,
                    error: true,
                    success: false,
                    message: 'Erreur certificat',
                })
        } else {
            getCertifRequest()
            setTimeout(() => {
                this.openPopup()
            }, 1000)
        }
    }

    /**
     * open popup list certif
     *
     * @memberof FormLogin
     */
    openPopup = () => {
        const { errorInfo } = this.props
        if (errorInfo.error === false) this.setState({ visible: true })
        else this.setState({ visible: false })
    }

    /**
     * submit certif
     *
     * @memberof FormLogin
     */
    handleSubmitCertif = () => {
        const { payload, email } = this.state
        const { alertShow, cryptosignRequest } = this.props
        if (payload.alias === null || payload.alias === undefined)
            alertShow(true, {
                warning: false,
                info: false,
                error: true,
                success: false,
                message: 'Merci de choisir une certificat',
            })
        else {
            cryptosignRequest({ ...payload, data: email, email })
            this.setState({ visible: false })
        }
    }

    /**
     * check if certif choisie
     *
     * @memberof FormLogin
     */
    checkCertif = e => {
        if (e.target.checked)
            this.setState({ payload: { alias: e.target.value } })
        else this.setState({ payload: { alias: null } })
    }

    /**
     * set payload
     *
     * @memberof FormLogin
     */
    handleChange = (event, name) => {
        this.setState({ [name]: event.target.value })
    }

    /**
     * close modal
     *
     * @memberof FormLogin
     */
    /**
     * fermer modal
     *
     * @memberof Actions
     */
    closeModal = () => {
        this.setState({ visible: false })
    }

    /* render */
    /**
     *
     *
     * @returns
     * @memberof Actions
     */
    render() {
        const { listCertif } = this.props
        const { visible } = this.state

        return (
            <div>
                <div className="d-flex justify-content-center h-100">
                    <div className="form">
                        <div align="center" className="form-title">
                            تسجيل الدخول
                            <img
                                className="img "
                                src={fleche}
                                alt="fleche"
                            ></img>
                        </div>
                        <div className="card-body">
                            <div className="formPadding">
                                <div className="rtl label">
                                    إسم المستخدم{' '}
                                    <span className="text-danger">* </span>
                                </div>
                                <div className="input-group form-group">
                                    <input
                                        type="text"
                                        style={{
                                            border: '#b20606 1px solid',
                                            outline: 'none',
                                            fontFamily: 'Arabic Kufi',
                                            fontWeight: 'Regular',
                                        }}
                                        className="rtl1 form-control"
                                        placeholder="أدخل إسم المستخدم"
                                        onChange={e =>
                                            this.handleChange(e, 'email')
                                        }
                                    />
                                </div>
                                <div className="rtl label">
                                    {' '}
                                    كلمة المرور{' '}
                                    <span className="text-danger">* </span>
                                </div>
                                <div className="input-group form-group">
                                    <input
                                        type="password"
                                        style={{
                                            border: '#b20606 1px solid',
                                            outline: 'none',
                                            fontFamily: 'Arabic Kufi',
                                            fontWeight: 'Regular',
                                        }}
                                        className="rtl1 form-control"
                                        placeholder="أدخل كلمة المرور"
                                        onChange={e =>
                                            this.handleChange(e, 'password')
                                        }
                                    />
                                </div>
                                <div className=" form-group col-xs-12 col-sm-4 col-md- align-items-center">
                                    <Button
                                        type="submit"
                                        size="sm"
                                        onClick={this.handleSubmit}
                                        style={{
                                            borderRadius: '10px',
                                            fontWeight: 'bold',
                                            borderColor: '#858484',
                                            backgroundColor: '#858484',
                                            width: '100px',
                                            fontFamily: 'Droid Arabic Kufi',
                                            float: 'right',
                                            marginRight: '-15px',
                                        }}
                                    >
                                        {' '}
                                        تسجيل الدخول
                                    </Button>
                                </div>
                                <div className="link_btn">
                                    <a
                                        href="/sendEmail"
                                        style={{
                                            textDecoration: 'underline',
                                            color: '#858484',
                                            float: 'left',
                                        }}
                                    >
                                        نسيت كلمة المرور ؟
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    show={visible}
                    onHide={this.closeModal}
                    animation
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    style={{ direction: 'rtl' }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title style={{ paddingLeft: '78%' }}>
                            <h2>
                                {' '}
                                <b>قائمة الشهادات</b>
                            </h2>
                        </Modal.Title>
                    </Modal.Header>

                    <div style={{ padding: '40px', direction: 'ltr' }}>
                        <FormControl component="fieldset">
                            <RadioGroup
                                aria-label="Usb"
                                name="usb"
                                onChange={this.checkCertif}
                            >
                                {listCertif &&
                                    Object.keys(listCertif).map(e => {
                                        return (
                                            <div
                                                style={{ padding: '5px 58px' }}
                                            >
                                                <FormControlLabel
                                                    value={e}
                                                    control={<Radio />}
                                                    label={e}
                                                />
                                            </div>
                                        )
                                    })}
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div
                        className="col-md-12"
                        style={{ textAlign: 'center', padding: '20px' }}
                    >
                        <Button
                            type="submit"
                            size="sm"
                            onClick={this.handleSubmitCertif}
                            style={{
                                borderRadius: '10px',
                                fontWeight: 'bold',
                                borderColor: '#858484',
                                backgroundColor: '#858484',
                                width: '100px',
                                fontFamily: 'Droid Arabic Kufi',
                                marginRight: '-15px',
                            }}
                        >
                            {' '}
                            تأكيد
                        </Button>
                    </div>
                </Modal>
            </div>
        )
    }
}
/**
 *  declaration des props
 */
FormLogin.propTypes = {
    loginRequest: PropTypes.func.isRequired,
    getCertifRequest: PropTypes.func.isRequired,
    alertShow: PropTypes.func.isRequired,
    cryptosignRequest: PropTypes.func.isRequired,
    listCertif: PropTypes.object.isRequired,
    errorInfo: PropTypes.string.isRequired,
    validationCertif: PropTypes.string.isRequired,
    onHideAlert: PropTypes.func.isRequired,
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    loginRequest: payload => dispatch(loginActions.loginRequest(payload)),
    getCertifRequest: payload =>
        dispatch(getCertifActions.getCertifRequest(payload)),
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
    cryptosignRequest: payload =>
        dispatch(cryptosignActions.cryptosignRequest(payload)),
    onHideAlert: () => dispatch(alertActions.alertHide()),
})

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = state => ({
    loginError: state.login.error,
    listCertif: state.certificat.getCertif.response,
    errorInfo: state.certificat.getInfo,
    validationCertif: state.certificat.validerCertif,
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormLogin)
