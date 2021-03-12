/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import Logo from '../../assets/images/logo.png'

/**
 *
 *
 * @returns
 */
const Header = () => {
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
                        className="center-block"
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
                    <Grid item xs={8} md sm className="right-block"></Grid>
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

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Header)
