import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

/**
 * tester sur les routes pour la permissions
 *
 * @param {*} { connected, ecrans, ...data }
 * @returns
 */
const ProtectedRoute = ({ connected, ecrans, ...data }) => {
    if (connected === data.showWhenConnected) {
        if (ecrans[0] !== '*') {
            console.log('ecrans', ecrans, data.path)
            if (
                !connected ||
                (connected &&
                    (!data.location ||
                        Object.values(ecrans || {}).includes(
                            data.path
                                .slice(1)
                                .replace('/:id', '')
                                .replaceAll('/', '-')
                        ) ||
                        data.path.replaceAll('/', '') === 'change_password'))
            ) {
                return <Route {...data} />
            }
        } else return <Route {...data} />
    }
    return (
        <h1 style={{ textAlign: 'center', padding: '3%', fontSize: '3rem' }}>
        Entrée interdite
        </h1>
    )
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
