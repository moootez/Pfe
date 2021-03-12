import { takeLatest, put, all } from 'redux-saga/effects'
import { goBack } from 'react-router-redux'
import alertActions from '../../../../redux/alert'
import editLienActions, {
    editLienTypes,
} from '../../../../redux/pageCms/lien/editLien'
import { Patch } from '../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* editLienSagas({ response }) {
    try {
        const res = yield Patch(`lien/edit/${response.id}`, response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(editLienActions.editLienSuccess(res.data)),
                // open popup de success
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: 'تم التعديل  بنجاح',
                    })
                ),
                yield put(goBack()),
            ])
        } else {
            yield put(editLienActions.editLienFailure(res))
        }
    } catch (error) {
        yield put(editLienActions.editLienFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* editLienSaga() {
    yield takeLatest(editLienTypes.EDIT_LIEN_REQUEST, editLienSagas)
}
