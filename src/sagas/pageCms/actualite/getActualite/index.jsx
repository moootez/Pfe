import { takeLatest, put, all } from 'redux-saga/effects'
import getActualiteActions, {
    getActualiteTypes,
} from '../../../../redux/pageCms/actualite/getActualite'
import { Get } from '../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 */
function* getActualiteSagas() {
    try {
        const res = yield Get(`actualite/all`)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(getActualiteActions.getActualiteSuccess(res.data)),
            ])
        } else {
            yield put(getActualiteActions.getActualiteFailure(res))
        }
    } catch (error) {
        yield put(getActualiteActions.getActualiteFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getActualiteSaga() {
    yield takeLatest(getActualiteTypes.GET_ACTUALITE_REQUEST, getActualiteSagas)
}
