import { getAllNotificationsSaga } from './getAllNotifications'
import { editNotificationsSaga } from './editNotifications'

/**
 * export all function saga (API)
 */
const notificationsSagas = [getAllNotificationsSaga, editNotificationsSaga]

export default notificationsSagas
