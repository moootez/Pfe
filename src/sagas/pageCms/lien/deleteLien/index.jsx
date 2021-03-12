import { takeLatest, put, all } from 'redux-saga/effects'
import alertActions from '../../../../redux/alert'
import deleteLienActions, {
    deleteLienTypes,
} from '../../../../redux/pageCms/lien/deleteLien'
import { Delete } from '../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* deleteLienSagas({ response }) {
    try {
        const res = yield Delete(`lien/${response}`)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(deleteLienActions.deleteLienSuccess(res.data)),
                // open popup de success
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: 'تم الحذف  بنجاح',
                    })
                ),
            ])
        } else {
            yield put(deleteLienActions.deleteLienFailure(res))
        }
    } catch (error) {
        yield put(deleteLienActions.deleteLienFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* deleteLienSaga() {
    yield takeLatest(deleteLienTypes.DELETE_LIEN_REQUEST, deleteLienSagas)
}
