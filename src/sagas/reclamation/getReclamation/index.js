/* eslint-disable import/prefer-default-export */
import axios from 'axios'
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getReclamationAction, {
    getReclamationTypes,
} from '../../../redux/reclamation/getReclamation'
import baseUrl from '../../../serveur/baseUrl'
import getLoaderActions from '../../../redux/wrapApi/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getReclamationSagas({ response }) {
    try {
        const { user, role } = response
        const endpoint =
            role === 'ROLE_ADV' || role === 'ROLE_ADMIN' ? 'all' : `get/${user}`
        yield put(getLoaderActions.activeGeneraleLoader())
        const { OpaliaToken } = window.localStorage

        const res = yield axios({
            method: 'get',
            url: `${baseUrl}reclamation/${endpoint}`,
            headers: {
                'Accept-Version': 1,
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${OpaliaToken}`
            },
            timeout: 10000,
        })
        if (res.status === 200) {
            yield all([
                yield put(getReclamationAction.getReclamationSuccess(res.data)),
                yield put(getLoaderActions.disableGeneraleLoader()),
            ])
        } else {
            yield put(getReclamationAction.getReclamationFailure(res.data))
            yield put(getLoaderActions.disableGeneraleLoader())
        }
    } catch (error) {
        yield put(getReclamationAction.getReclamationFailure(error))
        yield put(getLoaderActions.disableGeneraleLoader())
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getReclamationSaga() {
    yield takeLatest(
        getReclamationTypes.GET_RECLAMATION_REQUEST,
        getReclamationSagas
    )
}
