/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/order */
import React, { useEffect, useState  } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { Divider } from '@material-ui/core'
import getAllReclamations from '../../redux/reclamation/getReclamation'
import MaterialTable from 'material-table'

const Index = props => {
    const { userID, reclamations, getAllReclamation } = props
    useEffect(() => {
        getAllReclamation({ user: userID })
    }, [])
    // Set livraison on state

    return (
        <div className="column col-md-12 style-table">
             <Divider />
        <MaterialTable
            title="Mes réclamations"
            columns={[
                { title: 'ID', field: 'id'},
                { title: 'Client', field: 'client.codeInsc' },
                { title: 'Date Livraison', field: 'dateLivraison' },
                { title: 'Code Livraison', field: 'codeLivraison' },
                { title: 'Code Article', field: 'codeArticle' },
                { title: 'Quantite', field: 'quantite' },
                { title: 'Nature', field: 'nature' },
                { title: 'Gravite', field: 'gravite' },
                { title: 'Status', field: 'status' },
                { title: 'Motif', field: 'motif' },
                { title: 'Numéro Lot', field: 'numLot' },
                { title: 'action', field: 'action' },
                { title: 'Date Création', field: 'createdAt' }
            ]}
            data={JSON.parse(JSON.stringify(reclamations)) || []}
        />
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
    getAllReclamation: userID =>
        dispatch(getAllReclamations.getReclamationRequest(userID)),
})

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = ({ info, login, reclamation }) => ({
    userID: login.response.User.details.codeInsc,
    reclamations: reclamation.getReclamation.response,
    lng: info.language,
})

/* Proptypes */
/**
 *  declaration des props
 */
Index.propTypes = {
    userID: PropTypes.object.isRequired,
    reclamations: PropTypes.array.isRequired,
    getAllReclamation: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
