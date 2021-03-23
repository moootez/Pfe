/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable radix */
import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { Grid, Divider } from '@material-ui/core'
import getCommandeActions from '../../redux/commande/getCommande'
import validerCommandeActions from '../../redux/commande/validerCommande'
import PageTitle from '../../components/ui/pageTitle'

const Index = () => {
    return (
        <div className="column col-md-12">
            <Grid className="gridItem">
                <PageTitle label="Liste des reclamations" />
            </Grid>
            <Divider />
        </div>
    )
}
/* redux */

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getCommande: payload =>
        dispatch(getCommandeActions.getCommandeRequest(payload)),
    validerCommande: payload =>
        dispatch(validerCommandeActions.validerCommandeRequest(payload)),
})

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = ({ info, login, commande }) => ({
    userID: login.response.User.details.codeInsc,
    commandes: commande.getCommande.response,
    lng: info.language,
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
