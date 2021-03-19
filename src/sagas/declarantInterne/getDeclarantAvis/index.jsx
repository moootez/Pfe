/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import axios from 'axios'
import getDeclarantAvisActions, {
    getDeclarantAvisTypes,
} from '../../../redux/declarantInterne/getDeclarantAvis'

import baseUrl from '../../../serveur/baseUrl'
import getLoaderActions from '../../../redux/wrapApi/index'

// import alertActions from '../../../redux/alert'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getDeclarantAvisSagas({ response }) {
    try {
        const { user } = response
        yield put(getLoaderActions.activeGeneraleLoader())
        const res = yield axios({
            method: 'get',
            url: `${baseUrl.remote}Commande_entete/${user}`,
            headers: {
                'Accept-Version': 1,
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
            },
            timeout: 3000,
        })
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    getDeclarantAvisActions.getDeclarantAvisSuccess(res.data)
                ),
                yield put(getLoaderActions.disableGeneraleLoader()),
            ])
        } else {
            yield put(getDeclarantAvisActions.getDeclarantAvisFailure(res.data))
            yield put(getLoaderActions.disableGeneraleLoader())
        }
    } catch (error) {
        yield put(getDeclarantAvisActions.getDeclarantAvisFailure(error))
        yield put(getLoaderActions.disableGeneraleLoader())
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getDeclarantAvisSaga() {
    yield takeLatest(
        getDeclarantAvisTypes.GET_DECLARANT_AVIS_REQUEST,
        getDeclarantAvisSagas
    )
}
