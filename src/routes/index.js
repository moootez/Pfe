/* eslint-disable react/forbid-prop-types */
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import '../assets/sass/style.scss'
import instance from '../serveur/axios'
import wrapApiActions from '../redux/wrapApi'
import alertActions from '../redux/alert'
import SpinnerDot from '../components/ui/spinnerDot'
import Footer from '../containers/footer'
import Login from '../screens/login'
import Alert from '../components/ui/alert'
/* import { concatMessages } from '../shared/utility' */
import Dashboard from '../screens/dashboard'

/**
 *
 *
 * @class Routes
 * @extends {Component}
 */
class Routes extends Component {
    static propTypes = {
        history: PropTypes.shape({ push: PropTypes.func.isRequired })
            .isRequired,
        wrapApiCall: PropTypes.func.isRequired,
        wrapApiPut: PropTypes.func.isRequired,
        wrapApiCallFailure: PropTypes.func.isRequired,
        generalLoader: PropTypes.bool.isRequired,
        language: PropTypes.string.isRequired,
        allReferenciels: PropTypes.object,
        connected: PropTypes.bool.isRequired,
        FirstConnect: PropTypes.bool,
        loggedUser: PropTypes.object,
    }

    /**
     *  Inialisation
     *
     * @static
     * @memberof Routes
     */
    static defaultProps = {
        allReferenciels: {},
        loggedUser: null,
        FirstConnect: false,
    }

    constructor(props) {
        super(props)
        this.state = {}
        if (props.FirstConnect) {
            props.history.push('/change-password')
        }
    }

    /* life cycle */

    /**
     *
     *
     * @memberof
     */
    componentDidMount() {
        const {
            wrapApiCall,
            wrapApiCallFailure,
            wrapApiPut,
            language,
        } = this.props
        try {
            const self = this

            instance.interceptors.request.use(
                config => {
                    if (!config.url.includes('notification/')) wrapApiCall()
                    return config
                },
                error => {
                    wrapApiCallFailure(error)
                    return Promise.reject(error)
                }
            )

            instance.interceptors.response.use(
                response => {
                    wrapApiPut(response)
                    return response
                },
                error => {
                    const err = Promise.resolve(error)

                    err.then(e => {
                        if (e.config && !e.config.url.includes('notification/'))
                            self.props.alertShow(true, {
                                title: language === 'ar' ? 'Erreur' : 'Erreur',
                                warning: false,
                                info: false,
                                error: true,
                                success: false,
                                message:
                                    error.response !== undefined &&
                                    error.response.data &&
                                    error.response.data.message &&
                                    error.response.data.message.ar,
                            })
                        self.props.wrapApiPutFailure(e.toString())
                    })
                    return Promise.reject(error)
                }
            )
        } catch (err) {
            console.log(err, 'instance')
        }
    }

    /* render */
    /**
     *
     *
     * @returns
     * @memberof Actions
     */
    render() {
        const {
            generalLoader,
            language,
            connected,
            loggedUser,
            // FirstConnect,
            allReferenciels,
        } = this.props
        const role = loggedUser
            ? (loggedUser.User.details.userRoles[0] || {}).role
            : ''
        return (
            <Fragment>
                <SpinnerDot show={generalLoader} />
                <Alert />
                {connected && allReferenciels ? (
                    <div
                        className={
                            language === 'ar'
                                ? 'container-fluid'
                                : 'container-fluid'
                        }
                    >
                        <div className="App">
                            <Dashboard userRole={role} isLogged={connected} />
                        </div>

                        <Footer />
                    </div>
                ) : (
                    <div>
                        <Route path="/" component={Login} />
                    </div>
                )}
            </Fragment>
        )
    }
}
// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = ({ login, wrapApi, info, referencial }) => {
    return {
        connected: login.connected,
        FirstConnect: false,
        // login.FirstConnect &&
        // login.response.User.details.userRoles.find(
        //     i => i.role === 'ROLE_CITOYEN'
        // ) !== undefined,
        loggedUser: login.response,
        allReferenciels: referencial.allReferencials.response,
        generalLoader: wrapApi.generalLoader,
        language: info.language,
    }
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    wrapApiCall: () => dispatch(wrapApiActions.wrapApiCall({})),
    wrapApiCallFailure: payload =>
        dispatch(wrapApiActions.wrapApiCallFailure(payload)),
    wrapApiPut: payload => dispatch(wrapApiActions.wrapApiPut(payload)),
    wrapApiPutFailure: payload =>
        dispatch(wrapApiActions.wrapApiPutFailure(payload)),
    alertShow: (show, info) => dispatch(alertActions.alertShow(show, info)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Routes)
