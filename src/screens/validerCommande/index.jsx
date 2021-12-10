/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable radix */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */

import { red, green } from '@material-ui/core/colors'
import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { Divider } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import Button from '../../components/ui/button'
import getCommandeActions from '../../redux/commande/getCommande'
import validerCommandeActions from '../../redux/commande/validerCommande'
import exportPdfCommandeActions from '../../redux/commande/exportPdf'
import dupliquerCommandeActions from '../../redux/commande/dupliquerCommande'
import PageTitle from '../../components/ui/pageTitle'
import alertActions from '../../redux/alert'

const statusAndTxt = {
    BROUILLON: 'Valider',
    VALIDATION_CLIENT: 'Valider',
    VALIDATION_OPALIA: 'Valider',
    ANNULEE: 'Annuler',
}
/**
 *
 *
 * @param {*} { lng, intl, history, filtredTable, getActualite, alertHide, alertShow }
 * @returns
 */
const Index = props => {
    const {
        commandes,
        getCommande,
        alertHide,
        alertShow,
        userID,
        validerCommande,
        exportPdf,
        dupliquerCommande,
        pdfLink,
        syncProduits,
        role,
        history,
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

    const editCMD = rowData => {
        history.push({
            pathname: `/edit-commande/`,
            state: {
                index: rowData,
                idCMD: rowData.id,
            },
        })
    }

    return (
        <div className="column col-md-12 style-table">
            {/* <Grid className="gridItem">
                <PageTitle label="Validation commande" />
            </Grid> */}
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
                title={<PageTitle label="Commandes à valider" />}
                options={{
                    headerStyle: { fontSize: 20 },
                }}
                columns={[
                    {
                        title: 'ID',
                        field: 'id',
                    },
                    role === 'ROLE_CLIENT'
                        ? {
                              title: 'Date de création',
                              field: 'createdAt',
                          }
                        : { title: 'Statut', field: 'status' },
                    role !== 'ROLE_CLIENT'
                        ? {
                              title: 'Client',
                              field: 'client.codeInsc',
                          }
                        : {
                              title: 'Dupliquer commande',
                              field: 'dupliquer',
                              render: rowData => {
                                  return (
                                      <div>
                                          <IconButton
                                              onClick={() =>
                                                  dupliquerCommande({
                                                      id: rowData.id,
                                                      source: 'duplication',
                                                  })
                                              }
                                              color="primary"
                                          >
                                              <FileCopyOutlinedIcon />
                                          </IconButton>
                                      </div>
                                  )
                              },
                          },
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
                                <div>
                                    {toValide && (
                                        <IconButton
                                            onClick={() =>
                                                alertShow(true, {
                                                    warning: false,
                                                    info: true,
                                                    error: false,
                                                    success: false,
                                                    title: `Voulez-vous vraiment valider`,
                                                    onConfirm: () => {
                                                        handleSubmit(
                                                            newStatus,
                                                            rowData.id
                                                        )
                                                        // deleteActualite(item.id)
                                                        setTimeout(() => {
                                                            alertHide()
                                                            getCommande()
                                                        }, 2000)
                                                    },
                                                })
                                            }
                                            style={{ color: green[500] }}
                                            aria-label={statusAndTxt[newStatus]}
                                        >
                                            <CheckIcon />
                                        </IconButton>
                                    )}
                                    {role === 'ROLE_CLIENT' && (
                                        <IconButton
                                            onClick={() => editCMD(rowData)}
                                            aria-label={statusAndTxt[newStatus]}
                                            style={{ color: '#1c79be' }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                    <IconButton
                                        onClick={() =>
                                            alertShow(true, {
                                                warning: true,
                                                info: false,
                                                error: false,
                                                success: false,
                                                title: `Voulez-vous vraiment supprimer`,
                                                onConfirm: () => {
                                                    handleSubmit(
                                                        refusStatus,
                                                        rowData.id
                                                    )
                                                    setTimeout(() => {
                                                        alertHide()
                                                        getCommande()
                                                    }, 2000)
                                                },
                                            })
                                        }
                                        style={{ color: red[500] }}
                                        aria-label="Annuler"
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                            )
                        },
                    },
                    {
                        title: 'Export Pdf',
                        field: 'export',
                        render: rowData => {
                            return (
                                <div>
                                    <IconButton
                                        onClick={() =>
                                            exportPdf({ id: rowData.id })
                                        }
                                        color="primary"
                                    >
                                        <FileCopyIcon />
                                    </IconButton>
                                </div>
                            )
                        },
                    },
                ]}
                localization={{
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
                        searchPlaceholder: 'Rechercher',
                        emptyDataSourceMessage: 'pas de rien',
                    },
                }}
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
    alertShow: (show, info) =>
        dispatch(
            alertActions.alertShow(show, {
                onConfirm: info.onConfirm,
                warning: info.warning,
                info: info.info,
                error: info.error,
                success: info.success,
                message: info.message,
                title: info.title,
            })
        ),
    alertHide: () => dispatch(alertActions.alertHide()),
    dupliquerCommande: payload =>
        dispatch(dupliquerCommandeActions.dupliquerCommandeRequest(payload)),
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
    alertShow: PropTypes.func.isRequired,
    alertHide: PropTypes.func.isRequired,
    dupliquerCommande: PropTypes.func.isRequired,
    pdfLink: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    syncProduits: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
