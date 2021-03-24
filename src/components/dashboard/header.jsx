/* eslint-disable react/forbid-prop-types */
import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Grid, Button } from '@material-ui/core'
import Logo from '../../assets/images/logo.png'
import userlogo from '../../assets/images/usered.svg'

/**
 *
 *
 * @returns
 */
const logoutDivStyle = {
    position: 'relative',
    width: '131px',
    height: '122px',
    top: '100px',
    marginLeft: '-65px',
    right: '40px',
}

const Header = props => {
    const { logout, history } = props

    const [toggleDisconnectt, setToggleDisconnectt] = useState(false)

    const toggleDisconnect = () => {
        setToggleDisconnectt(!toggleDisconnectt)
    }
    const handleLogout = () => {
        logout()
        history.push('/')
    }

    /**
     * redirection interface chnage pwd
     *
     */
    const handleChangePssord = () => {
        history.push('/change_password')
    }
    // render
    return (
        <Fragment>
            <header className="dashboard-header">
                <Grid container>
                    <Grid item xs={4} md sm className="left-block"></Grid>
                    <Grid
                        item
                        md={4}
                        xs={4}
                        className="center-block p-2"
                        style={{ textAlign: '-webkit-center' }}
                    >
                        {/* logo INLUCC  */}
                        <div className="logo-img" role="presentation">
                            <img
                                src={Logo}
                                alt="Logo-INLUCC"
                                style={{ height: '10vh' }}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={8} md sm className="right-block">
                        <div className="d-none justify-content-end align-items-center w-100">
                            <div
                                className="pr-3 prof-access"
                                onClick={() => toggleDisconnect()}
                                onClic
                                role="presentation"
                            >
                                <img
                                    src={userlogo}
                                    alt="userlogo mr-3"
                                    width="40"
                                />
                            </div>
                            <div style={logoutDivStyle}>
                                {toggleDisconnectt && (
                                    <Fragment>
                                        <Button
                                            style={{ borderRadius: 'initial' }}
                                            variant="contained"
                                            size="small"
                                            color="secondary"
                                            className="disconnectButton"
                                            onClick={() => handleChangePssord()}
                                        >
                                            Changer le mot de passe
                                        </Button>
                                        <Button
                                            style={{
                                                width: '86px',
                                                borderRadius: 'initial',
                                            }}
                                            variant="contained"
                                            size="small"
                                            color="secondary"
                                            className="disconnectButton"
                                            onClick={() => handleLogout()}
                                        >
                                            Déconnecter
                                        </Button>
                                    </Fragment>
                                )}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </header>
        </Fragment>
    )
}

// obtenir les données from  store state
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
