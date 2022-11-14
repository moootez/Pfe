import { takeLatest, put, all } from 'redux-saga/effects'
import axios from 'axios'
import getStatistiqueActions, {
    getStatistiqueTypes,
} from '../../../redux/statistique/getStatistique'
import baseUrl from '../../../serveur/baseUrl'
import getLoaderActions from '../../../redux/wrapApi/index'

// import alertActions from '../../../redux/alert'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getStatistiqueSagas({ response }) {
    try {
        const { user, commande } = response
        yield put(getLoaderActions.activeGeneraleLoader())
        const { OpaliaToken } = window.localStorage

        const res = yield axios({
            method: 'get',
            url: `${baseUrl}appelCrm/Livraison_ligne/${user}/${commande}`,
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
                    getStatistiqueActions.getStatistiqueSuccess(res.data)
                ),
                yield put(getLoaderActions.disableGeneraleLoader()),
            ])
        } else {
            yield put(getStatistiqueActions.getStatistiqueFailure(res))
            yield put(getLoaderActions.disableGeneraleLoader())
        }
    } catch (error) {
        yield put(getStatistiqueActions.getStatistiqueFailure(error))
        yield put(getLoaderActions.disableGeneraleLoader())
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getStatistiqueSaga() {
    yield takeLatest(
        getStatistiqueTypes.GET_STATISTIQUE_REQUEST,
        getStatistiqueSagas
    )
}
