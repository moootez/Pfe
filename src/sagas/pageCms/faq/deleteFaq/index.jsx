import { takeLatest, put, all } from 'redux-saga/effects'
import alertActions from '../../../../redux/alert'
import deleteFaqActions, {
    deleteFaqTypes,
} from '../../../../redux/pageCms/faq/deleteFaq'
import { Delete } from '../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* deleteFaqSagas({ response }) {
    try {
        const res = yield Delete(`faq/${response}`)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(deleteFaqActions.deleteFaqSuccess(res.data)),
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
            yield put(deleteFaqActions.deleteFaqFailure(res))
        }
    } catch (error) {
        yield put(deleteFaqActions.deleteFaqFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* deleteFaqSaga() {
    yield takeLatest(deleteFaqTypes.DELETE_FAQ_REQUEST, deleteFaqSagas)
}
