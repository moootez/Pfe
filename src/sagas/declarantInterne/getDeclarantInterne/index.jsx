/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import axios from 'axios'
import getFilterDeclarantInterneActions, {
    getFilterDeclarantInterneTypes,
} from '../../../redux/declarantInterne/getDeclarantInterne'
import getLoaderActions from '../../../redux/wrapApi/index'
import baseUrl from '../../../serveur/baseUrl'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getFilterDeclarantInterneSagas({ response }) {
    try {
        const { user } = response
        yield put(getLoaderActions.activeGeneraleLoader())
        const { OpaliaToken } = window.localStorage

        const res = yield axios({
            method: 'get',
            url: `${baseUrl}appelCrm/Facture_entete/${user}`,
            headers: {
                'Accept-Version': 1,
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${OpaliaToken}`
            },
            timeout: 10000,
        })
        console.log(res)
        if (res.status === 200) {
            yield all([
                yield put(
                    getFilterDeclarantInterneActions.getFilterDeclarantInterneSuccess(
                        res.data
                    )
                ),
                yield put(getLoaderActions.disableGeneraleLoader()),
            ])
        } else {
            yield put(
                getFilterDeclarantInterneActions.getFilterDeclarantInterneFailure(
                    res.data
                )
            )
            yield put(getLoaderActions.disableGeneraleLoader())
        }
    } catch (error) {
        yield put(
            getFilterDeclarantInterneActions.getFilterDeclarantInterneFailure(
                error
            )
        )
        yield put(getLoaderActions.disableGeneraleLoader())
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getFilterDeclarantInterneSaga() {
    yield takeLatest(
        getFilterDeclarantInterneTypes.GET_FILTER_DECLARANT_INTERNE_REQUEST,
        getFilterDeclarantInterneSagas
    )
}
