import { takeLatest, put, all } from 'redux-saga/effects'
import { goBack } from 'react-router-redux'
import alertActions from '../../../../redux/alert'
import addLienActions, {
    addLienTypes,
} from '../../../../redux/pageCms/lien/addLien'
import { Post } from '../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addLienSagas({ response }) {
    try {
        const res = yield Post(`lien/new`, response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addLienActions.addLienSuccess(res.data)),
                // open popup de success
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: 'تم الإضافة  بنجاح',
                    })
                ),
                yield put(goBack()),
            ])
        } else {
            yield put(addLienActions.addLienFailure(res))
        }
    } catch (error) {
        yield put(addLienActions.addLienFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* addLienSaga() {
    yield takeLatest(addLienTypes.ADD_LIEN_REQUEST, addLienSagas)
}
