/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import axios from 'axios'
import getDeclarantSanctionActions, {
    getDeclarantSanctionTypes,
} from '../../../redux/declarantInterne/getDeclarantSanction'
import baseUrl from '../../../serveur/baseUrl'
import getLoaderActions from '../../../redux/wrapApi/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getDeclarantSanctionSagas({ response }) {
    try {
        const { facture } = response
        yield put(getLoaderActions.activeGeneraleLoader())
        const res = yield axios({
            method: 'get',
            url: `${baseUrl.remote}Facture_ligne/${facture}`,
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
                    getDeclarantSanctionActions.getDeclarantSanctionSuccess(
                        res.data
                    )
                ),
                yield put(getLoaderActions.disableGeneraleLoader()),
            ])
        } else {
            yield put(
                getDeclarantSanctionActions.getDeclarantSanctionFailure(
                    res.data
                )
            )
            yield put(getLoaderActions.disableGeneraleLoader())
        }
    } catch (error) {
        yield put(
            getDeclarantSanctionActions.getDeclarantSanctionFailure(error)
        )
        yield put(getLoaderActions.disableGeneraleLoader())
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getDeclarantSanctionSaga() {
    yield takeLatest(
        getDeclarantSanctionTypes.GET_DECLARANT_SANCTION_REQUEST,
        getDeclarantSanctionSagas
    )
}
