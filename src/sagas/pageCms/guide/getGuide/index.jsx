import { takeLatest, put, all } from 'redux-saga/effects'
import getGuideActions, {
    getGuideTypes,
} from '../../../../redux/pageCms/guide/getGuide'
import { Get } from '../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 */
function* getGuideSagas() {
    try {
        const res = yield Get(`guide/all`)
        if (res.status === 200 || res.status === 201) {
            yield all([yield put(getGuideActions.getGuideSuccess(res.data))])
        } else {
            yield put(getGuideActions.getGuideFailure(res))
        }
    } catch (error) {
        yield put(getGuideActions.getGuideFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getGuideSaga() {
    yield takeLatest(getGuideTypes.GET_GUIDE_REQUEST, getGuideSagas)
}
