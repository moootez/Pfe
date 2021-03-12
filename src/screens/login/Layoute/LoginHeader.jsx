import React, { Fragment } from 'react'
import ButtonAppBar from './Header'
import Headboard from './Headboard'

/**
 *
 *
 * @returns
 */
const LoginHeader = () => {
    return (
        <Fragment>
            <div>
                <ButtonAppBar />
                <Headboard />
            </div>
        </Fragment>
    )
}
export default LoginHeader
