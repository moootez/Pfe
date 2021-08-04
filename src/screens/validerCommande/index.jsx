/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable radix */
import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { Grid, Divider } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import Button from '../../components/ui/button'
import getCommandeActions from '../../redux/commande/getCommande'
import validerCommandeActions from '../../redux/commande/validerCommande'
import exportPdfCommandeActions from '../../redux/commande/exportPdf'
import importCommandeActions from '../../redux/commande/uploadCommande'
import PageTitle from '../../components/ui/pageTitle'

const statusAndTxt = {
    BROUILLON: 'Valider',
    VALIDATION_CLIENT: 'Valider',
    VALIDATION_OPALIA: 'Valider',
    ANNULEE: 'Annuler',
}

const Index = props => {
    const {
        commandes,
        getCommande,
        userID,
        validerCommande,
        exportPdf,
        importCommande,
        pdfLink,
        syncProduits,
        role,
    } = props

    const [allCommande, setAllCommande] = useState([])

    useEffect(() => {
        getCommande({ user: userID, role })
    }, [])

    useEffect(() => {
        let newCommandes
        if (role === 'ROLE_CLIENT')
            newCommandes = (commandes || []).filter(
                el => el.status === 'BROUILLON'
            )
        else
            newCommandes = (commandes || []).filter(
                el => el.status === 'VALIDATION_CLIENT'
            )
        setAllCommande(JSON.parse(JSON.stringify(newCommandes)))
    }, [commandes])

    useEffect(() => {
        if (pdfLink?.length) window.open(pdfLink, '_blank')
    }, [pdfLink])

    const handleSubmit = (newStatus, idCommande) => {
        validerCommande({
            status: newStatus,
            commande: idCommande,
            user: userID,
            role,
        })
    }

    return (
        <div className="column col-md-12">
            <Grid className="gridItem">
                <PageTitle label="Validation commande" />
            </Grid>
            <Divider />
            {role !== 'ROLE_CLIENT' && (
                <div>
                    <Button
                        clicked={syncProduits}
                        label="Synchronisation produits"
                    />
                </div>
            )}
            <MaterialTable
                title=""
                columns={[
                    {
                        title: 'ID',
                        field: 'id',
                    },
                    {
                        title: 'Code Inscription',
                        field: 'client.codeInsc',
                    },
                    { title: 'Adresse', field: 'client.ligneAdresse' },
                    { title: 'Ville', field: 'client.ville' },
                    { title: 'Status', field: 'status' },
                    {
                        title: 'Validation',
                        field: 'validation',
                        render: rowData => {
                            let newStatus = 'VALIDATION_OPALIA'
                            const refusStatus =
                                role !== 'ROLE_CLIENT' ? 'BROUILLON' : 'ANNULER'
                            if (rowData.status === 'BROUILLON') {
                                newStatus = 'VALIDATION_CLIENT'
                            } else if (rowData.status === 'VALIDATION_CLIENT') {
                                newStatus = 'VALIDATION_OPALIA'
                            }

                            const toValide =
                                rowData.status !== 'VALIDATION_OPALIA'

                            return (
                                <div style={{ width: 80 }}>
                                    {toValide && (
                                        <IconButton
                                            onClick={() =>
                                                handleSubmit(
                                                    newStatus,
                                                    rowData.id
                                                )
                                            }
                                            color="primary"
                                            aria-label={statusAndTxt[newStatus]}
                                        >
                                            <CheckIcon />
                                        </IconButton>
                                    )}
                                    <IconButton
                                        onClick={() =>
                                            handleSubmit(
                                                refusStatus,
                                                rowData.id
                                            )
                                        }
                                        color="secondary"
                                        aria-label="Annuler"
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                            )
                        },
                    },
                    {
                        title: 'Export Pdf Commande',
                        field: 'export',
                        render: rowData => {
                            return (
                                <div style={{ width: 80 }}>
                                    <IconButton
                                        onClick={() => exportPdf({ id: rowData.id })}
                                        color="primary"
                                    >
                                        <FileCopyIcon />
                                    </IconButton>
                                </div>
                            )
                        },
                    },
                    {
                        title: 'Import (Copy Commande)',
                        field: 'import',
                        render: rowData => {
                            return (
                                <div style={{ width: 80 }}>
                                    <IconButton
                                        onClick={() => importCommande({ id: rowData.id })}
                                        color="primary"
                                    >
                                        <FileCopyOutlinedIcon />
                                    </IconButton>
                                </div>
                            )
                        },
                    },
                ]}
                data={allCommande || []}
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
    getCommande: payload =>
        dispatch(getCommandeActions.getCommandeRequest(payload)),
    validerCommande: payload =>
        dispatch(validerCommandeActions.validerCommandeRequest(payload)),
    exportPdf: payload =>
        dispatch(exportPdfCommandeActions.exportPdfCommandeRequest(payload)),
    importCommande: payload =>
        dispatch(importCommandeActions.uploadCommandeRequest(payload)),
    syncProduits: () => dispatch({ type: 'SYNC_PRODUITS' }),
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
    role: login.response.User.details.userRoles[0].role,
    commandes: commande.getCommande.response,
    pdfLink: commande.exportPdf.response,
    lng: info.language,
})

/* Proptypes */
/**
 *  declaration des props
 */
Index.propTypes = {
    userID: PropTypes.object.isRequired,
    commandes: PropTypes.array.isRequired,
    getCommande: PropTypes.func.isRequired,
    validerCommande: PropTypes.func.isRequired,
    exportPdf: PropTypes.func.isRequired,
    importCommande: PropTypes.func.isRequired,
    pdfLink: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    syncProduits: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
