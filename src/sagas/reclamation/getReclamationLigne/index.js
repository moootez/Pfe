/* eslint-disable import/prefer-default-export */
import axios from 'axios'
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getReclamationLigneAction, {
    getReclamationLigneTypes,
} from '../../../redux/reclamation/getReclamationLigne'
import baseUrl from '../../../serveur/baseUrl'
import getLoaderActions from '../../../redux/wrapApi/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getReclamationLigneSagas({ response }) {
    try {
        yield put(getLoaderActions.activeGeneraleLoader())
        const { OpaliaToken } = window.localStorage
        const res = yield axios({
            method: 'get',
            url: `${baseUrl}reclamation/liste_retour/${response.id}`,
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
                yield put(getReclamationLigneAction.getReclamationLigneSuccess(res.data)),
                yield put(getLoaderActions.disableGeneraleLoader()),
            ])
        } else {
            yield put(getReclamationLigneAction.getReclamationLigneFailure(res.data))
            yield put(getLoaderActions.disableGeneraleLoader())
        }
    } catch (error) {
        yield put(getReclamationLigneAction.getReclamationLigneFailure(error))
        yield put(getLoaderActions.disableGeneraleLoader())
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getReclamationLigneSaga() {
    yield takeLatest(
        getReclamationLigneTypes.GET_RECLAMATION_LIGNE_REQUEST,
        getReclamationLigneSagas
    )
}
