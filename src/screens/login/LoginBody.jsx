import React from 'react'
import PropTypes from 'prop-types'
import FormLogin from './FormLogin'
import LoginHeader from './Layoute/LoginHeader'
import PartenaireLogin from './PartenaireLogin'
import SendEmail from './sendEmail'


/**
 * page login
 *
 * @param {*} { page }
 * @returns
 */
const LoginBody = ({ page }) => {
    return (
        <div>
            <LoginHeader />
            <div className="bg">
            <div className="shadow-login">
                {page === 'sendEmail' ? <SendEmail /> : <FormLogin />}
                <PartenaireLogin />
            </div>
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
