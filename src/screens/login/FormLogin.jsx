import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import loginActions from '../../redux/login'
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
        const { loginRequest } = this.props
        loginRequest({
            username: email,
            password,
            serialNumberToken: '165075729',
        })
    }

    /**
     * set payload
     *
     * @memberof FormLogin
     */
    handleChange = (event, name) => {
        this.setState({ [name]: event.target.value })
    }

    /* render */
    /**
     *
     *
     * @returns
     * @memberof Actions
     */
    render() {
        const { intl } = this.props

        return (
            <div>
                <div className="d-flex justify-content-center h-100">
                    <div className="form">
                        <div align="center" className="form-title">
                            {intl.formatMessage({ id: 'auth' })}
                            <img
                                className="img "
                                src={fleche}
                                alt="fleche"
                            ></img>
                        </div>
                        <div className="card-body">
                            <div className="formPadding">
                                <div className="label">
                                    {intl.formatMessage({ id: 'username' })}
                                    <span className="text-danger">* </span>
                                </div>
                                <div className="input-group form-group">
                                    <input
                                        type="text"
                                        style={{
                                            border: '#b20606 1px solid',
                                            outline: 'none',
                                            fontWeight: 'Regular',
                                        }}
                                        className="form-control"
                                        placeholder={intl.formatMessage({
                                            id: 'username',
                                        })}
                                        onChange={e =>
                                            this.handleChange(e, 'email')
                                        }
                                    />
                                </div>
                                <div className="label">
                                    {intl.formatMessage({ id: 'password' })}
                                    <span className="text-danger">* </span>
                                </div>
                                <div className="input-group form-group">
                                    <input
                                        type="password"
                                        style={{
                                            border: '#b20606 1px solid',
                                            outline: 'none',
                                            fontWeight: 'Regular',
                                        }}
                                        className="form-control"
                                        placeholder={intl.formatMessage({
                                            id: 'password',
                                        })}
                                        onChange={e =>
                                            this.handleChange(e, 'password')
                                        }
                                    />
                                </div>
                                <div className=" form-group d-flex  align-items-baseline justify-content-between">
                                    <Button
                                        type="submit"
                                        size="sm"
                                        onClick={this.handleSubmit}
                                        style={{
                                            borderRadius: '10px',
                                            fontWeight: 'bold',
                                            borderColor: '#858484',
                                            backgroundColor: '#858484',

                                            float: 'right',
                                        }}
                                    >
                                        Entrer
                                    </Button>
                                    <div className="link_btn">
                                        <a
                                            href="/sendEmail"
                                            style={{
                                                textDecoration: 'underline',
                                                color: '#858484',
                                                // float: 'left',
                                            }}
                                        >
                                            {intl.formatMessage({
                                                id: 'forgetPassword',
                                            })}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
/**
 *  declaration des props
 */
FormLogin.propTypes = {
    intl: PropTypes.object.isRequired,
    loginRequest: PropTypes.func.isRequired,
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
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(FormLogin))
