/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import editNotificationsActions, {
    editNotificationsTypes,
} from '../../../redux/notification/editNotifications'
import getAllNotificationsActions from '../../../redux/notification/getAllNotifications'
import { Patch } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* editNotificationsSagas({ response }) {
    try {
        const res = yield Patch(`ss4_notification/lu`, { id: response.id })

        if (res.status === 200) {
            yield all([
                yield put(
                    editNotificationsActions.editNotificationsSuccess(res.data)
                ),
                yield put(
                    getAllNotificationsActions.getAllNotificationsRequest({
                        role: response.role,
                        limit: response.limit,
                    })
                ),
            ])
        } else {
            yield put(editNotificationsActions.getAllNotificationsFailure(res))
        }
    } catch (error) {
        yield put(editNotificationsActions.getAllNotificationsFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* editNotificationsSaga() {
    yield takeLatest(
        editNotificationsTypes.EDIT_NOTIFICATIONS_REQUEST,
        editNotificationsSagas
    )
}
