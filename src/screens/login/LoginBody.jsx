import React from 'react'
import PropTypes from 'prop-types'
import FormLogin from './FormLogin'
import LoginHeader from './Layoute/LoginHeader'
import SendEmail from './sendEmail'

/**
 * page login
 *
 * @param {*} { page }
 * @returns
 */
const LoginBody = ({ page }) => {
    return (
        <div className="bg">
            <div>
                <LoginHeader />
                {page === 'sendEmail' ? <SendEmail /> : <FormLogin />}
            </div>
        </div>
    )
}
/**
 *  declaration des props
 */
LoginBody.propTypes = {
    page: PropTypes.string.isRequired,
}
export default LoginBody
