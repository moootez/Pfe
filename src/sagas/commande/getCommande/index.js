/* eslint-disable import/prefer-default-export */
import axios from 'axios'
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getCommandeAction, {
    getCommandeTypes,
} from '../../../redux/commande/getCommande'
import baseUrl from '../../../serveur/baseUrl'
import getLoaderActions from '../../../redux/wrapApi/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getCommandeSagas({ response }) {
    try {
        const { user, role } = response
        const endpoint =
            role === 'ROLE_ADV' || role === 'ROLE_ADMIN' ? 'all' : user
        yield put(getLoaderActions.activeGeneraleLoader())
        const res = yield axios({
            method: 'get',
            url: `${baseUrl}commande/${endpoint}`,
            headers: {
                'Accept-Version': 1,
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
            },
            timeout: 10000,
        })
        if (res.status === 200) {
            yield all([
                yield put(getCommandeAction.getCommandeSuccess(res.data.data)),
                yield put(getLoaderActions.disableGeneraleLoader()),
            ])
        } else {
            yield put(getCommandeAction.getCommandeFailure(res.data.data))
            yield put(getLoaderActions.disableGeneraleLoader())
        }
    } catch (error) {
        yield put(getCommandeAction.getCommandeFailure(error))
        yield put(getLoaderActions.disableGeneraleLoader())
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getCommandeSaga() {
    yield takeLatest(getCommandeTypes.GET_COMMANDE_REQUEST, getCommandeSagas)
}
