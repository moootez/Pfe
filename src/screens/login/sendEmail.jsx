/* eslint-disable no-restricted-globals */
import React, { Component } from 'react'
// import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { injectIntl, FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import sendEmailActions from '../../redux/user/sendEmail'
import alertActions from '../../redux/alert'
import './Login.css'

/**
 * page send email
 *
 * @class SendEmail
 * @extends {Component}
 */
class SendEmail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
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
     * verifie key to login with bouton enter
     *
     * @memberof SendEmail
     */
    verifKey = e => {
        if (e.keyCode === 13) {
            this.handleSubmit()
        }
    }

    /**
     * send email
     *
     * @memberof SendEmail
     */
    handleSubmit = () => {
        const { email } = this.state
        const { getEmail, alertShow } = this.props
        if (this.checkEmail(email)) {
            getEmail({ email })
        } else {
            alertShow(true, {
                warning: false,
                info: false,
                error: true,
                success: false,
                message: <FormattedMessage id="emailValidator" />,
            })
        }
    }

    /**
     * set payload
     *
     * @memberof SendEmail
     */
    handleChange = (event, name) => {
        this.setState({ [name]: event.target.value })
    }

    /**
     * check email
     *
     * @memberof SendEmail
     */
    checkEmail = email => {
        // eslint-disable-next-line no-useless-escape
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email)
    }

    /* render */
    /**
     *
     *
     * @returns
     * @memberof Actions
     */
    render() {
        return (
            <div 
                className="d-flex align-items-center"
                style={{ position: 'relative',
                top: '30%', }}
            >
                <div className="d-flex justify-content-center modal-login">
                    <div className="card-body form">
                        <div className="formPadding">
                            <div className="box-login input-group form-group text-center">
                                <input
                                    autoComplete="off"
                                    type="text"
                                    style={{
                                        border: '#939393 1px solid',
                                        outline: 'none',
                                        fontWeight: 'Regular',
                                    }}
                                    className="w-100"
                                    placeholder="Adresse email"
                                    onChange={e =>
                                        this.handleChange(e, 'email')
                                    }
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn-submit w-100 mt-2"
                                onClick={this.handleSubmit}
                            >
                                Valider
                            </button>
                            <button
                                type="submit"
                                className="btn-submit w-100 mt-2"
                                onClick={() => location.assign('/')}
                            >
                                Annuler
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
SendEmail.propTypes = {
    getEmail: PropTypes.func.isRequired,
    alertShow: PropTypes.func.isRequired,
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getEmail: payload => dispatch(sendEmailActions.sendEmailRequest(payload)),
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
    null,
    mapDispatchToProps
)(injectIntl(SendEmail))
