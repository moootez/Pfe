/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { history } from '../../store'
import News from '../newsBar'
import Logo from '../../assets/images/logo.png'

/**
 *
 *
 * @returns
 */

const Header = props => {
    const { logout } = props

    const handleLogout = () => {
        logout()
        history.push('/')
    }

    // render
    return (
        <Fragment>
            <header className="dashboard-header">
                <Grid container>
                    <Grid md={4} xs={4}>
                        {/* logo INLUCC  */}
                        <div className="logo-img" role="presentation">
                            <img
                                src={Logo}
                                alt="Logo-INLUCC"
                                style={{ height: 60 }}
                            />
                        </div>
                    </Grid>
                    <Grid xs={8} md sm className="right-block">
                        <div className="d-flex justify-content-end align-items-center w-100">
                            <div>
                                <Tooltip title="Se déconnecter">
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => handleLogout()}
                                    >
                                        <ExitToAppIcon
                                            style={{ color: 'black' }}
                                            fontSize="large"
                                        />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                    </Grid>
                    <News />
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
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    logout: PropTypes.func.isRequired,
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Header)
