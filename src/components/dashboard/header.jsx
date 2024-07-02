/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';

import { GridList } from '@material-ui/core'

// import ExitToAppIcon from '@material-ui/icons/ExitToApp'
// import {sidebar} from '../sidebar/index'
import { history } from '../../store'
// import News from '../newsBar'
// import Logopalia from '../../assets/images/logo_opalia.PNG'
// import Logo from '../../assets/images/logo.png'
import Sidebar from '../sidebar/index'

/**
 *
 *
 * @returns
 */
const page = window.location.pathname
const Header = props => {
    const { logout, loggedUser } = props
    const { username } = loggedUser.User.details

    const handleLogout = () => {
        logout()
        history.push('/actualite')
        window.location.reload()
    }

    // render
    return (
        <div>
            <div className="blc-sidebar">
                    <Sidebar />
            </div>
        </div>
    )
}

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = ({ login }) => ({
    loggedUser: login.response,
})
// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    logout: () =>
        dispatch({
            type: 'SIGNOUT_REQUEST',
        }),
})

Header.propTypes = {
    loggedUser: PropTypes.object.isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    logout: PropTypes.func.isRequired,
}



export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Header)