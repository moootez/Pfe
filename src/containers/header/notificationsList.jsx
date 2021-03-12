import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { compose } from 'redux'
import { connect } from 'react-redux'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
// eslint-disable-next-line import/no-unresolved
import { withRouter } from 'react-router'
// import { isEmpty } from 'lodash'
import { Replay } from '@material-ui/icons/'
import IconButton from '@material-ui/core/IconButton'
import { isEmpty } from 'lodash'
// import { formatNotifBody } from '../../shared/utility'
import editNotificationsActions from '../../redux/notification/editNotifications'
import getAllNotificationsActions from '../../redux/notification/getAllNotifications'
import './notification.css'

/**
 * NotificationsList
 */
class NotificationsList extends React.Component {
    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props)
        this.state = {
            toggleNotification: false,
            replay: '',
            // demandeId: null,
            limit: 5,
        }
    }

    /**
     *
     *
     * @param {*} nextProps
     * @memberof
     */
    componentWillReceiveProps() {
        this.setState({ replay: '' })
    }

    // /**
    //  * componentDidUpdate
    //  * @param props
    //  */
    // componentDidUpdate(props) {
    //     if (props.editNotificationsSuccess) {
    //         const { history } = this.props
    //         const { demandeId } = this.state
    //         history.replace({
    //             pathname: `/demande/modifier/${demandeId}`,
    //         })
    //         window.location.reload()
    //     }
    // }

    /**
     * Toggle Notification
     */
    toggleNotification = () => {
        this.setState(prevState => ({
            toggleNotification: !prevState.toggleNotification,
        }))
    }

    /**
     * Get Notifications
     * @returns {[]}
     */
    getNotifications = () => {
        const { allNotfications } = this.props
        const table = []
        try {
            // eslint-disable-next-line array-callback-return
            allNotfications.map((notif, index) => {
                table[index] = {
                    id: notif.id,
                    body: notif.type,
                    status: notif.read,
                }
            })
        } catch (error) {
            console.error(error)
        }
        return table
    }

    /**
     *
     * @param {integer} id - demande id
     * @memberof NotificationsList
     */
    handleDemande = (id, read) => {
        const { editNotifications, loggedUser, allNotfications } = this.props
        // this.setState({ demandeId })
        if (read === false)
            editNotifications({
                id,
                role: loggedUser.User.details.userRoles[0].role,
                limit: allNotfications.length,
            })
    }

    /**
     * Toggle Refresh Notification
     */
    toggleRefreshNotification = () => {
        const { getAllNotifications, loggedUser } = this.props
        this.setState({ replay: 'replay' })
        getAllNotifications({
            role: loggedUser.User.details.userRoles[0].role,
        })
    }

    /**
     *
     * show more notification
     * @memberof NotificationsList
     */
    showMoreNotif = e => {
        const { getAllNotifications, loggedUser, allNotfications } = this.props
        const { limit } = this.state
        console.log(e.target, allNotfications, 'zzz')
        getAllNotifications({
            role: loggedUser.User.details.userRoles[0].role,
            limit: allNotfications.length + limit,
        })
    }

    /**
     * Empty Snackbar Snackbar
     * @returns {*}
     */
    emptySnackbar = () => {
        const { replay } = this.state
        return (
            <SnackbarContent
                key="0"
                message="لا يوجد أي إشعار"
                className="bg-light text-primary"
                action={[
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        onClick={this.toggleRefreshNotification}
                    >
                        <Replay className={replay} />
                    </IconButton>,
                ]}
            />
        )
    }

    /**
     * Render
     * @returns {*}
     */
    /* render */
    /**
     *
     *
     * @returns
     * @memberof Actions
     */
    render() {
        const notifications = this.getNotifications()

        return (
            <Grid className="notificationContainer">
                <Grid className="notificationTitle">
                    <FormattedMessage id="notifications" />
                </Grid>
                <Grid className="notificationsBody">
                    {isEmpty(notifications)
                        ? this.emptySnackbar()
                        : notifications.map(value => (
                              <Grid
                                  style={{
                                      padding: '1% 0%',
                                  }}
                              >
                                  <SnackbarContent
                                      key={value.id}
                                      message={value.body}
                                      style={
                                          value.status
                                              ? {
                                                    backgroundColor: 'white',
                                                    color: 'black',
                                                }
                                              : {
                                                    backgroundColor: '#1d1d1b',
                                                    color: 'white',
                                                }
                                      }
                                      onClick={() =>
                                          this.handleDemande(
                                              value.id,
                                              value.status
                                          )
                                      }
                                  />
                              </Grid>
                          ))}
                </Grid>
                <Grid className="notificationFooter">
                    <a href="#" onClick={e => this.showMoreNotif(e)}>
                        المزيد
                    </a>
                </Grid>
            </Grid>
        )
    }
}

/**
 * propTypes
 * @type {{allNotfications: *, getAllNotifications: *, history: *, editNotifications: *, intl: *}}
 */
NotificationsList.propTypes = {
    allNotfications: PropTypes.array,
    editNotifications: PropTypes.func.isRequired,
    // history: PropTypes.object.isRequired,
    getAllNotifications: PropTypes.func.isRequired,
    loggedUser: PropTypes.object.isRequired,
    // editNotificationsSuccess: PropTypes.bool.isRequired,
}

/**
 * defaultProps
 * @type {{allNotfications: []}}
 */
NotificationsList.defaultProps = {
    allNotfications: [],
}

/**
 * mapStateToProps
 * @param info
 * @param login
 * @param notification
 * @returns {{allNotfications: *, loggedUser: *, language: *}}
 */
// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = ({ info, login, notification }) => ({
    language: info.language,
    loggedUser: login.response,
    allNotfications: notification.allNotifications.response,
    editNotificationsSuccess: notification.editNotifications.success,
})

/**
 * mapDispatchToProps
 * @param dispatch
 * @returns {{getAllNotifications: (function(): *), editNotifications: (function(*=): *)}}
 */
// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    editNotifications: payload =>
        dispatch(editNotificationsActions.editNotificationsRequest(payload)),

    getAllNotifications: payload =>
        dispatch(
            getAllNotificationsActions.getAllNotificationsRequest(payload)
        ),
})

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    injectIntl
)(withRouter(NotificationsList))
