import React from 'react'
import Logo from '../../../assets/images/logo_opalia.PNG'
import LogoRecordati from '../../../assets/images/logo.png'
import '../Login.css'

/**
 *
 *
 * @returns
 */
const LogoHeader = () => {
    return (
        <div className="row logo">
            <div className="blc_logo_right col-md-6">
                <img src={LogoRecordati} alt="logo" className="logo-rec"></img>
            </div>
            <div className="blc_logo_left col-md-6">
                <img src={Logo} alt="logo"></img>
            </div>
        </div>
    )
}
export default LogoHeader
