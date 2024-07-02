/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import axios from 'axios'
import getCommandeByClientActions, {
    getCommandeByClientTypes,
} from '../../../redux/commande/getCommandeByClient'
import baseUrl from '../../../serveur/baseUrl'
import getLoaderActions from '../../../redux/wrapApi/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getCommandeByClientSagas({ response }) {
    try {
        const { user } = response
        yield put(getLoaderActions.activeGeneraleLoader())
        const { OpaliaToken } = window.localStorage

        const res = yield axios({
            method: 'get',
            url: `${baseUrl}commande/${user}`,
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
                yield put(
                    getCommandeByClientActions.getCommandeByClientSuccess(
                        res.data
                    )
                ),
                yield put(getLoaderActions.disableGeneraleLoader()),
            ])
        } else {
            yield put(
                getCommandeByClientActions.getCommandeByClientFailure(res.data)
            )
            yield put(getLoaderActions.disableGeneraleLoader())
        }
    } catch (error) {
        yield put(getCommandeByClientActions.getCommandeByClientFailure(error))
        yield put(getLoaderActions.disableGeneraleLoader())
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getCommandeByClientSaga() {
    yield takeLatest(
        getCommandeByClientTypes.GET_COMMANDE_REQUEST,
        getCommandeByClientSagas
    )
}
