import React, { useState, Fragment } from 'react'
import { Grid } from '@material-ui/core'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import Button from '@material-ui/core/Button'
import { injectIntl, FormattedMessage } from 'react-intl'
import userlogo from '../../assets/images/usered.svg'

/**
 * Index
 *
 * @param {*} { logout, history }
 * @returns
 */
const Index = ({ logout, history }) => {
    const [toggleDisconnectt, setToggleDisconnectt] = useState(false)

    const logoutDivStyle = {
        position: 'absolute',
        width: '131px',
        height: '122px',
        top: '100%',
        left: '50%',
        marginLeft: '-65px',
    }

    /**
     * toogle pour deconnecter et change mot de passe
     *
     */
    const toggleDisconnect = () => {
        setToggleDisconnectt(!toggleDisconnectt)
    }

    /**
     *
     * lougout et redirection pour interface login
     */
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

    return (
        <header className="header container-fluid">
            <Grid container-fluid>
                <Grid item xs={4} md sm className="left-block"></Grid>
                <Grid item xs={8} md sm className="right-block">
                    <div className="pos-relative">
                        <div
                            className="prof-access"
                            onClick={() => toggleDisconnect()}
                            role="presentation"
                        >
                            <img src={userlogo} alt="userlogo" />
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
                                        <FormattedMessage id="Changepassword" />
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
                                        <FormattedMessage id="disconnect" />
                                    </Button>
                                </Fragment>
                            )}
                        </div>
                    </div>
                </Grid>
            </Grid>
        </header>
    )
}

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
/**
 *  declaration des props
 */
Index.propTypes = {
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    logout: PropTypes.func.isRequired,
}

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = ({ login, info }) => ({
    connected: login.connected,
    loggedUser: login.response,
    language: info.language,
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(injectIntl(Index)))
