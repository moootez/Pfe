import { takeLatest, put, all } from 'redux-saga/effects'
import getFaqActions, {
    getFaqTypes,
} from '../../../../redux/pageCms/faq/getFaq'
import { Get } from '../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 */
function* getFaqSagas() {
    try {
        const res = yield Get(`faq/all`)
        if (res.status === 200 || res.status === 201) {
            yield all([yield put(getFaqActions.getFaqSuccess(res.data))])
        } else {
            yield put(getFaqActions.getFaqFailure(res))
        }
    } catch (error) {
        yield put(getFaqActions.getFaqFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getFaqSaga() {
    yield takeLatest(getFaqTypes.GET_FAQ_REQUEST, getFaqSagas)
}
