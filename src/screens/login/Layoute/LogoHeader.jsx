import React from 'react'
import LogoRecordati from '../../../assets/images/inetum.jpg'
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
           
        </div>
    )
}
export default LogoHeader
