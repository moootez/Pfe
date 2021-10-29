import React, { Component } from 'react'
// import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import loginActions from '../../redux/login'
import alertActions from '../../redux/alert'
import './Login.css'


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
        if (e.keyCode === 1) {
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
                className="d-flex align-items-center"
                style={{ position: 'relative',
                    top: '20%', }}
            >
                <div className="d-flex justify-content-center modal-login">
                    <div className="card-body form">
                        <div className="formPadding">
                            <div className="box-login input-group form-group text-center">
                                <span className="icon-input"><PersonIcon /></span>
                                <input
                                    autoComplete="off"
                                    type="text"
                                    style={{
                                        border: 'transparent 1px solid',
                                        outline: 'none',
                                        fontWeight: 'Regular',
                                        height: '65px',
                                        textAlign: 'center'
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

                            <div className="box-pswrd input-group form-group text-center">
                            <span className="icon-input"><LockIcon /></span>
                                <input
                                    autoComplete="off"
                                    type="password"
                                    style={{
                                        border: 'transparent 1px solid',
                                        outline: 'none',
                                        fontWeight: 'Regular',
                                        justifyContent: 'center',
                                        height: '65px',
                                        textAlign: 'center'
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
                            <div className="link_btn">
                                <a href="/sendEmail">
                                    {intl.formatMessage({
                                        id: 'forgetPassword',
                                    })}
                                </a>
                            </div>
                            <button
                                type="submit"
                                className="btn-submit w-100"
                                onClick={this.handleSubmit}
                            >
                                Entrer
                            </button>
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
