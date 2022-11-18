/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/order */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { Divider } from '@material-ui/core'
import getAllReclamations from '../../redux/reclamation/getReclamation'
import MaterialTable from 'material-table'

const Index = props => {
    const { userID, reclamations, getAllReclamation } = props
    const [allList, setAllList] = useState(0);
    useEffect(() => {
        getAllReclamation({ user: userID })
    }, [])

    useEffect(() => {
        if (reclamations !== null) setAllList(reclamations.length)
    }, [reclamations])
    // Set livraison on state

    return (
        <div className="column col-md-12 style-table">
            <Divider />
            {reclamations && <MaterialTable
                title="Mes réclamations"
                options={{
                    headerStyle: { fontSize: 20 },
                    pageSizeOptions: reclamations.length !== 0 && [
                        5,
                        10,
                        20,
                        { value: allList, label: 'Afficher Tous' },
                    ],
                }}
                columns={[
                    { title: 'ID', field: 'id' },
                    //  { title: 'Client', field: 'client.codeInsc' },
                    { title: 'Date Livraison', field: 'dateLivraison' },
                    { title: 'Code Livraison', field: 'codeLivraison' },
                    { title: 'Code Article', field: 'codeArticle' },
                    { title: 'Quantité', field: 'quantite' },
                    { title: 'Nature', field: 'nature' },
                    { title: 'Gravité', field: 'gravite' },
                    { title: 'Statut', field: 'status' },
                    { title: 'Motif de refus', field: 'motif' },
                    { title: 'Numéro Lot', field: 'numLot' },
                    { title: 'Action', field: 'action' },
                ]}
                localization={{
                    body: {
                        emptyDataSourceMessage:
                            "Pas d'enregistreent à afficher",
                        addTooltip: 'Ajouter',
                        deleteTooltip: 'Supprimer',
                        editTooltip: 'Editer',
                        filterRow: {
                            filterTooltip: 'Filtrer',
                        },
                        editRow: {
                            deleteText: 'Voulez-vous supprimer cette ligne?',
                            cancelTooltip: 'Annuler',
                            saveTooltip: 'Enregistrer',
                        },
                    },
                    grouping: {
                        placeholder: "Tirer l'entête ...",
                        groupedBy: 'Grouper par:',
                    },
                    header: {
                        actions: 'Actions',
                    },
                    pagination: {
                        labelDisplayedRows: '{from}-{to} de {count}',
                        labelRowsSelect: 'lignes par page',
                        labelRowsPerPage: 'lignes par page:',
                        firstAriaLabel: 'Première page',
                        firstTooltip: 'Première page',
                        previousAriaLabel: 'Page précédente',
                        previousTooltip: 'Page précédente',
                        nextAriaLabel: 'Page suivante',
                        nextTooltip: 'Page suivante',
                        lastAriaLabel: 'Dernière page',
                        lastTooltip: 'Dernière page',
                    },
                    toolbar: {
                        addRemoveColumns: 'Ajouter ou supprimer des colonnes',
                        nRowsSelected: '{0} ligne(s) sélectionée(s)',
                        showColumnsTitle: 'Voir les colonnes',
                        showColumnsAriaLabel: 'Voir les colonnes',
                        exportTitle: 'Exporter',
                        exportAriaLabel: 'Exporter',
                        exportName: 'Exporter en CSV',
                        searchTooltip: 'Rechercher',
                        searchPlaceholder: 'Rechercher',
                    },
                }}
                data={JSON.parse(JSON.stringify(reclamations)) || []}
            />}
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
