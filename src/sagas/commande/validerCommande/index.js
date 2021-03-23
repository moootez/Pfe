/* eslint-disable import/prefer-default-export */
import axios from 'axios'
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import validerCommandeAction, {
    validerCommandeTypes,
} from '../../../redux/commande/validerCommande'
import baseUrl from '../../../serveur/baseUrl'
import getLoaderActions from '../../../redux/wrapApi/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* validerCommandeSagas({ response }) {
    try {
        const { commande, status } = response
        yield put(getLoaderActions.activeGeneraleLoader())
        const res = yield axios({
            method: 'post',
            url: `${baseUrl}commande/change-status/${commande}`,
            headers: {
                'Accept-Version': 1,
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
            },
            timeout: 3000,
            data: { status },
        })
        if (res.status === 200) {
            yield all([
                yield put(
                    validerCommandeAction.validerCommandeSuccess(res.data.data)
                ),
                yield put(getLoaderActions.disableGeneraleLoader()),
            ])
        } else {
            yield put(
                validerCommandeAction.validerCommandeFailure(res.data.data)
            )
            yield put(getLoaderActions.disableGeneraleLoader())
        }
    } catch (error) {
        yield put(validerCommandeAction.validerCommandeFailure(error))
        yield put(getLoaderActions.disableGeneraleLoader())
    }
}

/**
 * appele à la fonction with key action
 */
export default function* validerCommandeSaga() {
    yield takeLatest(
        validerCommandeTypes.VALIDER_COMMANDE_REQUEST,
        validerCommandeSagas
    )
}
