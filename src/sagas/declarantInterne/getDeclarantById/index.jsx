/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import axios from 'axios'
import getDeclarantInterneActions, {
    getDeclarantInterneTypes,
} from '../../../redux/declarantInterne/getDeclarantById'
import baseUrl from '../../../serveur/baseUrl'
import getLoaderActions from '../../../redux/wrapApi/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getDeclarantInterneSagas({ response }) {
    try {
        const { user, commande } = response
        yield put(getLoaderActions.activeGeneraleLoader())
        const res = yield axios({
            method: 'get',
            url: `${baseUrl.remote}Commande_Ligne/${commande}/${user}`,
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
                yield put(
                    getDeclarantInterneActions.getDeclarantInterneSuccess(
                        res.data
                    )
                ),
                yield put(getLoaderActions.disableGeneraleLoader()),
            ])
        } else {
            yield put(
                getDeclarantInterneActions.getDeclarantInterneFailure(res.data)
            )
            yield put(getLoaderActions.disableGeneraleLoader())
        }
    } catch (error) {
        yield put(getDeclarantInterneActions.getDeclarantInterneFailure(error))
        yield put(getLoaderActions.disableGeneraleLoader())
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getDeclarantInterneSaga() {
    yield takeLatest(
        getDeclarantInterneTypes.GET_DECLARANT_INTERNE_REQUEST,
        getDeclarantInterneSagas
    )
}
