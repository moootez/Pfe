import React, { Fragment } from 'react'
import LoginBody from './LoginBody'

/**
 * redirect to page login or send email
 *
 * @returns
 */
const Index = () => {
    const page = window.location.pathname

    return (
        <Fragment>
            <LoginBody page={page === '/sendEmail' ? 'sendEmail' : ''} />
        </Fragment>
    )
}
export default Index
