import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import dataList from '../components/sidebar/data.json'
import ErreurPage from '../screens/erreurPage'
/**
 * tester sur les routes pour la permissions
 *
 * @param {*} { connected, ecrans, ...data }
 * @returns
 */
const ProtectedRoute = ({ connected, ecrans, history, ...data }) => {
    if (connected === data.showWhenConnected) {
        if (
            dataList[0].items.filter(
                element => element.link === window.location.pathname
            )[0]
        ) {
            if (
                dataList[0].items
                    .filter(
                        element => element.link === window.location.pathname
                    )[0]
                    .roles.includes(localStorage.role)
            ) {
                return <Route {...data} />
            }
        } else if (dataList[0].items) {
            return dataList[0].items.map(element => {
                if (element.subitems) {
                    if (
                        element.subitems.filter(
                            e => e.link === window.location.pathname
                        )[0]
                    ) {
                        if (
                            element.subitems
                                .filter(
                                    e => e.link === window.location.pathname
                                )[0]
                                .roles.includes(localStorage.role)
                        )
                            return <Route {...data} />
                    }
                }
                return;
            })
        } else return <Route {...data} component={ErreurPage} />
    }

    // if (location.pathname === '/error404') {
    //     return <Route {...data} component={ErreurPage} />
    // }
    return <Route {...data} component={ErreurPage} />
}
/**
 *  Inialisation
 */
ProtectedRoute.defautProps = {
    connected: null,
    location: null,
}
/**
 *  declaration des props
 */
ProtectedRoute.propTypes = {
    connected: PropTypes.bool.isRequired,
    ecrans: PropTypes.object.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        location: PropTypes.object,
    }).isRequired,
}
// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = state => ({
    connected: state.login.connected,
    ecrans: state.login.response.User.ecrans,
})

export default connect(mapStateToProps)(withRouter(ProtectedRoute))
