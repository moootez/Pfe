/* eslint-disable react/forbid-prop-types */
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {  Route,Switch  } from 'react-router-dom'
import '../assets/sass/style.scss'
import instance from '../serveur/axios'
import wrapApiActions from '../redux/wrapApi'
import alertActions from '../redux/alert'
import SpinnerDot from '../components/ui/spinnerDot'
// import Footer from '../containers/footer'
import Login from '../screens/login'
import Alert from '../components/ui/alert'
/* import { concatMessages } from '../shared/utility' */
import Sidebar from '../components/sidebar/index'


// import Actualites from '../screens/pageCms/actualite/index'
import GestionActualites from '../screens/pageCms/actualite/gestionActualite'
import GestionUtilisateurs from '../screens/user/getUser/index'
import AdduserComponent from '../screens/user/addUser/index'
import MesCommandes from '../screens/commande/index'
import CommandesAValider from '../screens/validerCommande/index'
import CreerCommande from '../screens/createCommande/index'
import HistoriqueCommande from '../screens/histtoriqueCommande/index'
import MesReclamations from '../screens/reclamation/index'
import DeposerReclamation from '../screens/addReclamation/index'
import ListeReclamations from '../screens/listeReclamation/index'
import ReclamationsAValider from '../screens/validerReclamation/index'
import Livraisons from '../screens/referencial/index'
import Factures from '../screens/facture/index'
import Reglements from '../screens/reglement'
import ParametreGlobale from '../screens/parametreGlobale/parametreGlobale'
import Produit from '../screens/produit'
import EditProduit from '../screens/produit/editProduit'
import DashboardComponent from '../screens/tableauDuBord/index'
import PhotosAnimees from '../screens/photosAnimees'
import editActualite from '../screens/pageCms/actualite/editActualite'
import addActualite from '../screens/pageCms/actualite/addActualite'
import EditPhotoanimes from '../screens/photosAnimees/editPhoto/index'
/**
 *
 *
 * @class Routes
 * @extends {Component}
 */
class Routes extends Component {
    static propTypes = {
        history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
        wrapApiCall: PropTypes.func.isRequired,
        wrapApiPut: PropTypes.func.isRequired,
        wrapApiCallFailure: PropTypes.func.isRequired,
        generalLoader: PropTypes.bool.isRequired,
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
        const { OpaliaToken } = window.localStorage;
        const { wrapApiCall, wrapApiCallFailure, wrapApiPut } = this.props;
        try {
            const self = this;

            instance.interceptors.request.use(
                config => {
                    if (!config.url.includes('notification/')) wrapApiCall();
                    return config;
                },
                error => {
                    wrapApiCallFailure(error);
                    return Promise.reject(error);
                }
            );

            instance.interceptors.response.use(
                response => {
                    wrapApiPut(response);
                    return response;
                },
                error => {
                    const err = Promise.resolve(error);
                    if (OpaliaToken) {
                        err.then(e => {
                            if (e.config && !e.config.url.includes('notification/'))
                                self.props.alertShow(true, {
                                    title: 'Erreur',
                                    warning: false,
                                    info: false,
                                    error: true,
                                    success: false,
                                    message: error.response !== undefined &&
                                        error.response.data &&
                                        error.response.data.message &&
                                        error.response.data.message.fr,
                                });
                            self.props.wrapApiPutFailure(e.toString());
                        });
                        return Promise.reject(error);
                    }
                    return null;
                }
            );
        } catch (err) {
            console.log(err, 'instance');
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
        const { generalLoader,  connected, loggedUser } = this.props;
        const role = loggedUser ? (loggedUser.User.details.userRoles[0] || {}).role : '';

        return (
            <Fragment>
                <SpinnerDot show={generalLoader} />
                <Alert />
                {connected ? (
                    <Sidebar role={role} loggedUser={loggedUser}>
                        <Switch>
                            <Route path="/commande" component={MesCommandes} />
                            <Route path="/validation-commande" component={CommandesAValider} />
                            <Route path="/create_commande" component={CreerCommande} />
                            <Route path="/historique-commande" component={HistoriqueCommande} />
                            <Route path="/mes-reclamation" component={MesReclamations} />
                            <Route path="/ajout-reclamation" component={DeposerReclamation} />
                            <Route path="/liste-reclamation" component={ListeReclamations} />
                            <Route path="/validation-reclamation" component={ReclamationsAValider} />
                            <Route path="/edit_photo" component={EditPhotoanimes} />
                            <Route path="/dashboard" component={DashboardComponent}/> 
                            <Route path="/actualite/new" component={addActualite} />
                            <Route path="/actualite/edit" component={editActualite} />
                            <Route path="/actualite/gestion" component={GestionActualites} />
                            <Route path="/user" component={GestionUtilisateurs} />
                            <Route path="/ajout_user" component={AdduserComponent} />
                            <Route path="/edit_user" component={AdduserComponent} />
                            <Route path="/livraison" component={Livraisons} />
                            <Route path="/facture" component={Factures} />
                            <Route path="/reglement" component={Reglements} />
                            <Route path="/prametreGlobale" component={ParametreGlobale} />
                            <Route path="/produit" component={Produit} />
                            <Route path="/edit_produit" component={EditProduit} />
                            <Route path="/photos-animees" component={PhotosAnimees} />
                        </Switch>
                    </Sidebar>
                ) : (
                    <Route path="/" component={Login} />
                )}
            </Fragment>
        );
    }
}
// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = ({ login, wrapApi, info }) => {
    return {
        connected: login.connected,
        FirstConnect: false,
        // login.FirstConnect &&
        // login.response.User.details.userRoles.find(
        //     i => i.role === 'ROLE_CITOYEN'
        // ) !== undefined,
        loggedUser: login.response,
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

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
