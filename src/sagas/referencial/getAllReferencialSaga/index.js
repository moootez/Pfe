/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects'
import axios from 'axios'
import getAllReferencesActions, {
    getAllReferenceTypes,
} from '../../../redux/referencial/getAllReferencial'
import getLoaderActions from '../../../redux/wrapApi/index'
import baseUrl from '../../../serveur/baseUrl'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getAllReferencialSagas(payload) {
    const { user } = payload.response
    try {
        yield put(getLoaderActions.activeGeneraleLoader())
        const response = yield axios({
            method: 'get',
            url: `${baseUrl.remote}Livraison_entete/${user}`,
            headers: {
                'Accept-Version': 1,
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
            },
            timeout: 3000,
        })

        if (response.status === 200) {
            yield put(
                getAllReferencesActions.getAllReferenceSuccess(response.data)
            )
            yield put(getLoaderActions.disableGeneraleLoader())
        } else {
            yield put(getAllReferencesActions.getAllReferenceFailure(response))
            yield put(getLoaderActions.disableGeneraleLoader())
        }
    } catch (error) {
        yield put(
            getAllReferencesActions.getAllReferenceFailure(error.toString())
        )
        yield put(getLoaderActions.disableGeneraleLoader())
    }
}

/**
 * appele à la fonction with key action
 */
export function* getAllReferencialSaga() {
    yield takeLatest(
        getAllReferenceTypes.GET_ALL_REFERENCE_REQUEST,
        getAllReferencialSagas
    )
}
