import { takeLatest, put, all } from 'redux-saga/effects'
import { goBack } from 'react-router-redux'
import alertActions from '../../../../redux/alert'
import addFaqActions, {
    addFaqTypes,
} from '../../../../redux/pageCms/faq/addFaq'
import { Post } from '../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addFaqSagas({ response }) {
    try {
        const res = yield Post(`faq/new`, response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addFaqActions.addFaqSuccess(res.data)),
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
            yield put(addFaqActions.addFaqFailure(res))
        }
    } catch (error) {
        yield put(addFaqActions.addFaqFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* addFaqSaga() {
    yield takeLatest(addFaqTypes.ADD_FAQ_REQUEST, addFaqSagas)
}
