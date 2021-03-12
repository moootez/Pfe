/* eslint-disable react/forbid-prop-types */
import React from 'react'
import { connect } from 'react-redux'
import Badge from '@material-ui/core/Badge'
import NotificationsIcon from '@material-ui/icons/Notifications'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import NotificationsList from './notificationsList'
import getAllNotificationsActions from '../../redux/notification/getAllNotifications'

/**
 *
 *
 * @class Notifications
 * @extends {React.Component}
 */
class Notifications extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            toggleDisconnect: false,
            toggleNotification: false,
            countNotification: 0,
        }
    }

    /* life cycle */

    /**
     *
     *
     * @memberof
     */
    componentDidMount() {
        const { getAllNotifications, loggedUser } = this.props
        getAllNotifications({
            role: loggedUser.User.details.userRoles[0].role,
        })
        this.interval = setInterval(
            () =>
                getAllNotifications({
                    role: loggedUser.User.details.userRoles[0].role,
                }),
            300000
        )
    }

    /**
     *
     *
     * @param {*} nextProps
     * @memberof
     */
    componentWillReceiveProps(nextProps) {
        this.setState({
            countNotification: nextProps.allNotfications
                ? this.getAllNotificationsLength(nextProps.allNotfications)
                : 0,
        })
    }

    /**
     *
     *
     * @memberof Notifications
     */
    componentWillUnmount() {
        clearInterval(this.interval)
    }

    /**
     * obtenir nomber des notifications non lus
     *
     * @memberof Notifications
     */
    getAllNotificationsLength = allNotifications => {
        let length = 0
        // eslint-disable-next-line array-callback-return
        allNotifications.map(e => {
            // eslint-disable-next-line no-plusplus
            if (!e.read) length++
        })

        return length
    }

    /**
     * ouvrir liste notif
     *
     * @memberof Notifications
     */
    toggleNotification = () => {
        this.setState(prevState => ({
            toggleNotification: !prevState.toggleNotification,
            countNotification: 0,
        }))
    }

    /**
     * fermer liste notif
     *
     * @memberof Notifications
     */
    handleClickAwayNotification = () => {
        this.setState({ toggleNotification: false })
    }

    /**
     *
     *
     * @memberof Notifications
     */
    toggleDisconnect = () => {
        this.setState(prevState => ({
            toggleDisconnect: !prevState.toggleDisconnect,
        }))
    }

    /* render */
    /**
     *
     *
     * @returns
     * @memberof Actions
     */
    render() {
        const { toggleNotification, countNotification } = this.state

        return (
            <div>
                <div className="right-block">
                    <div className="notifications">
                        <ClickAwayListener
                            onClickAway={this.handleClickAwayNotification}
                        >
                            <div className="pos-relative">
                                <Badge
                                    color="error"
                                    badgeContent={countNotification}
                                    onClick={this.toggleNotification}
                                >
                                    <NotificationsIcon />
                                </Badge>

                                {toggleNotification && (
                                    <NotificationsList allNotfications />
                                )}
                            </div>
                        </ClickAwayListener>
                    </div>
                </div>
            </div>
        )
    }
}

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = ({ info, login, notification, pageTitle }) => ({
    language: info.language,
    loggedUser: login.response,
    allNotfications: notification.allNotifications.response,
    currentRoute: pageTitle,
})

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    logout: () =>
        dispatch({
            type: 'SIGNOUT_REQUEST',
        }),
    getAllNotifications: payload =>
        dispatch(
            getAllNotificationsActions.getAllNotificationsRequest(payload)
        ),
})
/**
 *  declaration des props
 */
Notifications.propTypes = {
    getAllNotifications: PropTypes.func.isRequired,
    allNotfications: PropTypes.array,
    loggedUser: PropTypes.object.isRequired,
}
/**
 *  Inialisation
 */
Notifications.defaultProps = {
    allNotfications: [],
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Notifications))
