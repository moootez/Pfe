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
        const { user, dateDebut, dateFin } = response
        yield put(getLoaderActions.activeGeneraleLoader())
        const { OpaliaToken } = window.localStorage

        const res = yield axios({
            method: 'get',
            url: `${baseUrl}appelCrm/Commande_entete/${user}/${dateDebut}/${dateFin}`,
            headers: {
                'Accept-Version': 1,
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${OpaliaToken}`
            },
            timeout: 10000,
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
