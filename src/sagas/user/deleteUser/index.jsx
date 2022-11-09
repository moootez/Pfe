import { takeLatest, put, all } from 'redux-saga/effects'
import alertActions from '../../../redux/alert'
import deleteUserActions, {
    deleteUserTypes,
} from '../../../redux/user/deleteUser'
import { Delete } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* deleteUserSagas({ response }) {
    try {
        const res = yield Delete(`users/${response}`)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    deleteUserActions.deleteUserSuccess(res.data)
                ),
                // open popup de success
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: 'Supprimé avec succès',
                    })
                ),
            ])
        } else {
            yield put(deleteUserActions.deleteUserFailure(res))
        }
    } catch (error) {
        yield put(deleteUserActions.deleteUserFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* deleteUserSaga() {
    yield takeLatest(
        deleteUserTypes.DELETE_USER_REQUEST,
        deleteUserSagas
    )
}
