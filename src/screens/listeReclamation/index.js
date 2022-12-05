/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/order */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MaterialTable from 'material-table'
import { injectIntl } from 'react-intl'
import SendIcon from '@material-ui/icons/Send'
import CallIcon from '@material-ui/icons/CallMissedOutgoing'
// import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import {
    Grid,
    Divider,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton,
    Input,
    TextField,
} from '@material-ui/core'
import getAllReclamations from '../../redux/reclamation/getReclamation'
import updateReclamations from '../../redux/reclamation/updateReclamation'
import generateKey from '../../shared/utility'
import TableCollapse from '../../components/tableWithCollapse'
import PageTitle from '../../components/ui/pageTitle'
import getReclamationLignes from '../../redux/reclamation/getReclamationLigne'
import alertActions from '../../redux/alert'
import baseUrl from '../../serveur/baseUrl'
import axios from 'axios'

const status = ['Reçue', 'En cours', 'Refusée', 'Acceptée']

const Index = props => {
    const {
        userID,
        reclamations,
        getAllReclamation,
        role,
        updateReclamation,
        reclamationDetails,
        getReclamationLigne,
        alertHide,
        alertShow,
        history
    } = props

    const [reclamationStatus, setReclamationStatus] = useState({})
    const [allList, setAllList] = useState(0);
    const { OpaliaToken } = window.localStorage

    useEffect(() => {
        getAllReclamation({ user: userID, role })
    }, [])

    useEffect(() => {
        if (reclamations !== null) setAllList(reclamations.length)
    }, [reclamations])

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
    const onValidate = (item) => {
        alertShow(true, {
            warning: false,
            info: true,
            error: false,
            success: false,
            title: `Voulez-vous vraiment accépter la réclamation`,
            onConfirm: () => {
                // handleSubmitValider(rowData.id)
                setTimeout(() => {
                    axios({
                        method: 'post',
                        url: `${baseUrl}reclamation/change-status-retour/${item.id}`,
                        headers: {
                            'Accept-Version': 1,
                            Accept: 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json; charset=utf-8',
                            Authorization: `Bearer ${OpaliaToken}`,
                        },
                        data: { status: 'accepté' },
                    }).then(res => {
                        if (res.status === 201 || res.code === 200) {
                            alertShow(true, {
                                onConfirm: false,
                                warning: false,
                                info: false,
                                error: false,
                                success: true,
                                message: 'Accepté avec succés',
                            })
                            // window.location.reload()
                        }
                    })
                    alertHide()
                    // getAllReclamation({ user: userID, role })
                    // window.location.reload()
                    setTimeout(() => {
                        // getAllReclamation({ user: userID, role })
                        getReclamationLigne({ id: item.id_rec })
                    }, 1000)
                }, 2000)
            },
        })

    }

    const onDelete = (item) => {
        alertShow(true, {
            warning: false,
            info: true,
            error: false,
            success: false,
            title: `Voulez-vous vraiment refuser la réclamation`,
            onConfirm: () => {
                // handleSubmitValider(rowData.id)
                setTimeout(() => {
                    axios({
                        method: 'post',
                        url: `${baseUrl}reclamation/change-status-retour/${item.id}`,
                        headers: {
                            'Accept-Version': 1,
                            Accept: 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json; charset=utf-8',
                            Authorization: `Bearer ${OpaliaToken}`,
                        },
                        data: { status: 'refusé' },
                    }).then(res => {
                        if (res.status === 201 || res.code === 200) {
                            alertShow(true, {
                                onConfirm: false,
                                warning: false,
                                info: false,
                                error: false,
                                success: true,
                                message: 'Réfusé avec succés',
                            })
                            // window.location.reload()
                        }
                    })
                    alertHide()
                    setTimeout(() => {
                        // getAllReclamation({ user: userID, role })
                        getReclamationLigne({ id: item.id_rec })
                    }, 1000)
                    // getAllReclamation({ user: userID, role })
                    // window.location.reload()
                }, 2000)
            },
        })

    }

    const validationClick = (rowData) => {
        history.push({
            pathname: `/consulter-reclamation`,
            state: {
                index: rowData,
                consulter: true
            },
        })
    }

    const recapClick = (rowData) => {
        history.push({
            pathname: `/recap-retours`,
            state: {
                index: rowData,
                id: rowData.id,
                consulter: true
            },
        })
    }

    // Set livraison on state
    const header = [
        { title: 'Code réclamation', field: 'id' },
        { title: 'Client', field: 'client.codeInsc' },
        { title: 'Date livraison', field: 'createdAt' },
        {
            title: 'Statut',
            field: 'status',
        },
        {
            title: 'Validation',
            field: 'validation',
            render: rowData => {
                return (
                    <div>
                        <IconButton
                            onClick={() => validationClick(rowData)}
                            color="primary"
                            aria-label="Changer status"
                            disabled={rowData.status !== 'accepté'}
                        // disabled={rowData.status === 'Acceptée'}
                        >
                            <SendIcon />
                        </IconButton>
                        {/* )} */}
                    </div>
                )
            },
        },
        {
            title: 'Recap Retour',
            field: 'recap',
            render: rowData => {
                return (
                    <div>
                        <IconButton
                            onClick={() => recapClick(rowData)}
                            color="primary"
                            aria-label="Changer status"
                            disabled={rowData.status !== 'validé'}
                        // disabled={rowData.status === 'Acceptée'}
                        >
                            <SendIcon />
                        </IconButton>
                        {/* )} */}
                    </div>
                )
            },
        },
    ]
    return (
        <Fragment>
            <div className="column col-md-12 style-table">
                <Divider />
                <TableCollapse
                    title="Traitement des réclamations"
                    apiCall={getAllReclamation}
                    dataApi={{ user: userID }}
                    dataReturned={JSON.parse(JSON.stringify(reclamations))}
                    dataSubArray={dataSubArray}
                    headerTable={header}
                    userID={userID}
                    validationReclamation
                    onValidate={onValidate}
                    onDelete={onDelete}
                />
            </div>
        </Fragment>
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
    updateReclamation: payload =>
        dispatch(updateReclamations.updateReclamationRequest(payload)),
    getAllReclamation: payload =>
        dispatch(getAllReclamations.getReclamationRequest(payload)),
    getReclamationLigne: data =>
        dispatch(getReclamationLignes.getReclamationLigneRequest(data)),
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
    role: login.response.User.details.userRoles[0].role,
    reclamationDetails: reclamation.getReclamationLigne.response,
    lng: info.language,
})

/* Proptypes */
/**
 *  declaration des props
 */
Index.propTypes = {
    role: PropTypes.string.isRequired,
    userID: PropTypes.object.isRequired,
    reclamations: PropTypes.array.isRequired,
    getAllReclamation: PropTypes.func.isRequired,
    reclamationDetails: PropTypes.array.isRequired,
    getReclamationLigne: PropTypes.func.isRequired,
    alertShow: PropTypes.func.isRequired,
    alertHide: PropTypes.func.isRequired,
    updateReclamation: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
