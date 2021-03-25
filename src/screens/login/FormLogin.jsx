import React, { Component } from 'react'
// import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import loginActions from '../../redux/login'
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
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: '80vh' }}
            >
                <div
                    className="d-flex justify-content-center"
                    style={{ width: '30%' }}
                >
                    <div className="card-body form">
                        <div className="formPadding">
                            <div className="input-group form-group text-center">
                                <input
                                    autoComplete="off"
                                    type="text"
                                    style={{
                                        border: '#939393 1px solid',
                                        outline: 'none',
                                        fontWeight: 'Regular',
                                    }}
                                    className="w-100"
                                    placeholder={intl.formatMessage({
                                        id: 'username',
                                    })}
                                    onChange={e =>
                                        this.handleChange(e, 'email')
                                    }
                                />
                            </div>

                            <div className="input-group form-group text-center">
                                <input
                                    autoComplete="off"
                                    type="password"
                                    style={{
                                        border: '#939393 1px solid',
                                        outline: 'none',
                                        fontWeight: 'Regular',
                                        justifyContent: 'center',
                                    }}
                                    className="w-100"
                                    placeholder={intl.formatMessage({
                                        id: 'password',
                                    })}
                                    onChange={e =>
                                        this.handleChange(e, 'password')
                                    }
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn-submit w-100"
                                onClick={this.handleSubmit}
                            >
                                Entrer
                            </button>
                            <div className="link_btn text-center">
                                <a
                                    href="/sendEmail"
                                    style={{
                                        textDecoration: 'underline',
                                        color: '#cd121a ',
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
        )
    }
}
/**
 *  declaration des props
 */
FormLogin.propTypes = {
    intl: PropTypes.object.isRequired,
    loginRequest: PropTypes.func.isRequired,
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
