/* eslint-disable import/prefer-default-export */
import axios from 'axios'
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getSanctionActions, {
    getSanctionTypes,
} from '../../../redux/declarantInterne/getSanctionById'
import baseUrl from '../../../serveur/baseUrl'
import getLoaderActions from '../../../redux/wrapApi/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getSanctionSagas({ response }) {
    try {
        const { user } = response
        yield put(getLoaderActions.activeGeneraleLoader())
        const res = yield axios({
            method: 'get',
            url: `${baseUrl.remote}Reglements/1/${user}`,
            headers: {
                'Accept-Version': 1,
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
            },
            timeout: 3000,
        })
        if (res.status === 200) {
            yield all([
                yield put(getSanctionActions.getSanctionSuccess(res.data)),
                yield put(getLoaderActions.disableGeneraleLoader()),
            ])
        } else {
            yield put(getSanctionActions.getSanctionFailure(res.data))
            yield put(getLoaderActions.disableGeneraleLoader())
        }
    } catch (error) {
        yield put(getSanctionActions.getSanctionFailure(error))
        yield put(getLoaderActions.disableGeneraleLoader())
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getSanctionSaga() {
    yield takeLatest(getSanctionTypes.GET_SANCTION_REQUEST, getSanctionSagas)
}
