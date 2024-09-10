import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import PageTitle from '../../../components/ui/pageTitle'
import Table from '../../../components/ui/table/index'
import getAllUsersActions from '../../../redux/user/getAllUsers'
import getAllRolesActions from '../../../redux/roles/getAllRoles'
import alertActions from '../../../redux/alert'
import deleteUserActions from '../../../redux/user/deleteUser'
/**
 * API call to fetch logs for a specific user with Bearer token
 * @param {string} username
 * @returns {Promise<Array>} logs data for the user
 */
const fetchUserLogs = async username => {
    try {
        const token = localStorage.getItem('OpaliaToken') // Assuming token is stored in localStorage
        console.log('Token:', token)
        const response = await fetch(
            'http://localhost:8000/api/user/auth/get-user-logs',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            }
        )
        if (!response.ok) {
            throw new Error('Failed to fetch user logs')
        }
        const data = await response.json()
        return data.logs || []
    } catch (error) {
        console.error('Error fetching user logs:', error)
        return []
    }
}

const Index = ({
    lng,
    intl,
    history,
    getAllUsersReq,
    getAllRolesReq,
    allUsers,
}) => {
    const [rows, setRows] = useState([])
    const [meta, setMeta] = useState([])

    const headers = [
        'Username',
        'Role', // Added Role column
        intl.formatMessage({ id: 'Action' }),
        intl.formatMessage({ id: 'Timestamp' }),
        intl.formatMessage({ id: 'Description' }),
        intl.formatMessage({ id: 'Is Successful' }),
        intl.formatMessage({ id: 'IP Address' }),
    ]

    const setTable = async users => {
        let rowsTmp = []
        if (users && users.length > 0) {
            const logPromises = users.map(async user => {
                const logs = await fetchUserLogs(user.username)
                const userRole =
                    user.userRoles && user.userRoles.length > 0
                        ? user.userRoles[0].role
                        : 'N/A'
                return logs.map(log => ({
                    username: user.username,
                    role: userRole, // Added role to each row
                    action: log.action,
                    timestamp: log.timestamp,
                    description: log.description,
                    isSuccessful: log.is_successful ? 'Yes' : 'No',
                    ipAddress: log.ip_address,
                }))
            })

            const allLogs = await Promise.all(logPromises)
            rowsTmp = allLogs.flat() // Flattening the array of arrays

            // Sort the rows by timestamp in ascending order (oldest first)
            rowsTmp.sort(
                (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
            )
        }
        setRows(rowsTmp)
    }

    useEffect(() => {
        getAllRolesReq()
        getAllUsersReq()
    }, [])

    useEffect(() => {
        if (allUsers) {
            setTable(allUsers.data)
            setMeta(allUsers.meta)
        }
    }, [allUsers])

    return (
        <div style={{ padding: '1%' }}>
            <Grid className="gridItem">
                <PageTitle label="Suivi des utilisateurs" />
            </Grid>
            <Table
                lng={lng}
                headers={headers}
                rows={rows}
                history={history}
                intl={intl}
                type="logs"
                meta={meta}
            />
        </div>
    )
}

const mapStateToProps = state => ({
    lng: state.info.language,
    allUsers: state.users.allUsers.response,
    allRoles: state.roles.getAllRoles.response,
})

const mapDispatchToProps = dispatch => ({
    getAllUsersReq: payload =>
        dispatch(getAllUsersActions.getAllUsersRequest(payload)),
    getAllRolesReq: () => dispatch(getAllRolesActions.getAllRolesRequest()),
    syncUsers: () => dispatch({ type: 'SYNC_USERS' }),
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
    deleteUser: payload =>
        dispatch(deleteUserActions.deleteUserRequest(payload)),
})

Index.propTypes = {
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
    getAllUsersReq: PropTypes.func.isRequired,
    getAllRolesReq: PropTypes.func.isRequired,
    allUsers: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Index))
