/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp'
// import {sidebar} from '../sidebar/index'
import { history } from '../../store'
// import News from '../newsBar'
import Logopalia from '../../assets/images/logo_opalia.PNG'
import Sidebar from '../sidebar/Sidebar'

/**
 *
 *
 * @returns
 */

const Header = props => {
    const { logout, loggedUser } = props
    const { username } = loggedUser.User.details

    const handleLogout = () => {
        logout()
        history.push('/dashboard')
    }

    // render
    return (
        <Fragment>
            <header className="dashboard-header">
                <Grid container className="row">
                    <Grid md={2} xs={4} className="left-block">
                        {/* logo INLUCC  */}
                        <div className="logo-img" role="presentation">
                            <a href="/dashboard">
                                <img
                                    src={Logopalia}
                                    alt="Logo-INLUCC"
                                    // style={{ height: 60 }}
                                />
                            </a>

                        </div>
                    </Grid>

                    <Grid md={10} xs={8} sm className="right-block">
                        
                        <div className="blc_conn_username d-flex justify-content-end align-items-center w-100">
                            <div className="d-flex flex-column blc-top-header">
                            <p className="username">{username}</p>
                            <p className="blc_deconnexion">
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => handleLogout()}
                                >
                                    <PowerSettingsNewIcon
                                        style={{ color: '#c20d20' }}
                                        fontSize="small"
                                        label="yy"
                                    />
                                    Déconnexion
                                </IconButton>
                            
                            </p>
                            </div>
                        </div>
                        <div className="blc-sidebar">
                            <Router>
                                <Sidebar
                                />
                            </Router>
                        </div>
                    </Grid>
                </Grid>
            </header>
        </Fragment>
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
