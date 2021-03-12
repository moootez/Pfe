import { takeLatest, put, all } from 'redux-saga/effects'
import { goBack } from 'react-router-redux'
import alertActions from '../../../../redux/alert'
import editFaqActions, {
    editFaqTypes,
} from '../../../../redux/pageCms/faq/editFaq'
import { Patch } from '../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* editFaqSagas({ response }) {
    try {
        const res = yield Patch(`faq/edit/${response.id}`, response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(editFaqActions.editFaqSuccess(res.data)),
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
            yield put(editFaqActions.editFaqFailure(res))
        }
    } catch (error) {
        yield put(editFaqActions.editFaqFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* editFaqSaga() {
    yield takeLatest(editFaqTypes.EDIT_FAQ_REQUEST, editFaqSagas)
}
