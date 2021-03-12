import React from 'react'
import Logo from '../../../assets/images/logo.png'
import '../Login.css'

/**
 *
 *
 * @returns
 */
const LogoHeader = () => {
    return (
        <div className="row logo">
            <div className=""> </div>
            <div className="">
                <img src={Logo} alt="logo" style={{ height: '10vh' }}></img>
            </div>
            <div className=""> </div>
        </div>
    )
}
export default LogoHeader
