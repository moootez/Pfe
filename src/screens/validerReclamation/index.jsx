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
import axios from 'axios'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
// import Button from '../../components/ui/button'
import getCommandeActions from '../../redux/commande/getCommande'
import validerCommandeActions from '../../redux/commande/validerCommande'
import exportPdfCommandeActions from '../../redux/commande/exportPdf'
import dupliquerCommandeActions from '../../redux/commande/dupliquerCommande'
import PageTitle from '../../components/ui/pageTitle'
import alertActions from '../../redux/alert'
import getAllReclamations from '../../redux/reclamation/getReclamation'
import TableCollapse from '../../components/tableWithCollapse'
import getReclamationLignes from '../../redux/reclamation/getReclamationLigne'
import baseUrl from '../../serveur/baseUrl'

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
        reclamations,
        getCommande,
        alertHide,
        alertShow,
        userID,
        validerCommande,
        exportPdf,
        dupliquerCommande,
        pdfLink,
        // syncProduits,
        role,
        history,
        getAllReclamation,
        reclamationDetails,
        getReclamationLigne,
    } = props
    const { OpaliaToken } = window.localStorage

    const [allReclamation, setAllReclamation] = useState([])
    const [allList, setAllList] = useState(0)

    useEffect(() => {
        getAllReclamation({ user: userID })
    }, [])


    useEffect(() => {
        setAllReclamation(JSON.parse(JSON.stringify(reclamations)))
    }, [reclamations])

    useEffect(() => {
        if (pdfLink?.length) window.open(pdfLink, '_blank')
    }, [pdfLink])

    const handleSubmitValider = (id) => {
        axios({
            method: 'post',
            url: `${baseUrl}reclamation/change-status/${id}`,
            headers: {
                'Accept-Version': 1,
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${OpaliaToken}`,
            },
            data: { status: 'en cours' },
        }).then(res => {
            if (res.status === 201 || res.code === 200) {
                alertShow(true, {
                    onConfirm: false,
                    warning: false,
                    info: false,
                    error: false,
                    success: true,
                    message: 'Valider avec succés',
                })
            }
        })
    }

    const handleSubmitDelete = (id) => {
        axios({
            method: 'delete',
            url: `${baseUrl}reclamation/${id}`,
            headers: {
                'Accept-Version': 1,
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${OpaliaToken}`,
            },
        }).then(res => {
            if (res.status === 201 || res.status === 200) {
                alertShow(true, {
                    onConfirm: false,
                    warning: false,
                    info: false,
                    error: false,
                    success: true,
                    message: 'Supprimer avec succés',
                })
            }
        })
    }

    const editReclamation = rowData => {
        history.push({
            pathname: `/ajout-reclamation`,
            state: {
                index: rowData
            },
        })
    }

    const [dataSubArray, setDataSubArray] = useState({
        apiCall: getReclamationLigne,
        dataApi: data => ({
            id: data.id,
        }),
        dataId: 'No-reclamation',
        dataReturned: reclamationDetails,
    })

    useEffect(() => {
        setDataSubArray({ ...dataSubArray, dataReturned: reclamationDetails })
    }, [reclamationDetails])

    const header = [
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
        // role !== 'ROLE_CLIENT'
        {
            title: 'Client',
            field: 'client.codeInsc',
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
                                            handleSubmitValider(rowData.id)
                                            setTimeout(() => {
                                                alertHide()
                                                getAllReclamation({ user: userID })
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
                        {/* {role === 'ROLE_CLIENT' && (
                            <IconButton
                                onClick={() => editReclamation(rowData)}
                                aria-label={statusAndTxt[newStatus]}
                                style={{ color: '#1c79be' }}
                            >
                                <EditIcon />
                            </IconButton>
                        )} */}
                        <IconButton
                            onClick={() =>
                                alertShow(true, {
                                    warning: true,
                                    info: false,
                                    error: false,
                                    success: false,
                                    title: `Voulez-vous vraiment supprimer`,
                                    onConfirm: () => {
                                        handleSubmitDelete(rowData.id)
                                        setTimeout(() => {
                                            alertHide()
                                            getAllReclamation({ user: userID })
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
    ]
    return (
        <div className="column col-md-12 style-table">
            <Divider />
            <TableCollapse
                title="Réclamation à valider"
                apiCall={getAllReclamation}
                dataApi={{ user: userID }}
                dataReturned={JSON.parse(JSON.stringify(reclamations))}
                dataSubArray={dataSubArray}
                headerTable={header}
                userID={userID}
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
    getAllReclamation: userID =>
        dispatch(getAllReclamations.getReclamationRequest(userID)),
    getReclamationLigne: data =>
        dispatch(getReclamationLignes.getReclamationLigneRequest(data)),
    // syncProduits: () => dispatch({ type: 'SYNC_PRODUITS' }),
})

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = ({ info, login, commande, reclamation }) => ({
    userID: login.response.User.details.codeInsc,
    role: login.response.User.details.userRoles[0].role,
    reclamations: reclamation.getReclamation.response,
    pdfLink: commande.exportPdf.response,
    lng: info.language,
    reclamationDetails: reclamation.getReclamationLigne.response,
})

/* Proptypes */
/**
 *  declaration des props
 */
Index.propTypes = {
    userID: PropTypes.object.isRequired,
    reclamations: PropTypes.array.isRequired,
    getCommande: PropTypes.func.isRequired,
    validerCommande: PropTypes.func.isRequired,
    exportPdf: PropTypes.func.isRequired,
    alertShow: PropTypes.func.isRequired,
    alertHide: PropTypes.func.isRequired,
    dupliquerCommande: PropTypes.func.isRequired,
    getReclamationLigne: PropTypes.func.isRequired,
    pdfLink: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    // syncProduits: PropTypes.func.isRequired,
    getAllReclamation: PropTypes.func.isRequired,
    reclamationDetails: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Index))
