/* eslint-disable import/prefer-default-export */
import axios from 'axios'
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getAllProductAction, {
    getAllProductTypes,
} from '../../../redux/commande/getAllProduct'
import baseUrl from '../../../serveur/baseUrl'
import getLoaderActions from '../../../redux/wrapApi/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getAllProductSagas() {
    try {
        yield put(getLoaderActions.activeGeneraleLoader())
        const res = yield axios({
            method: 'get',
            url: `${baseUrl}article/all`,
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
                    getAllProductAction.getAllProductSuccess(res.data.data)
                ),
                yield put(getLoaderActions.disableGeneraleLoader()),
            ])
        } else {
            yield put(getAllProductAction.getAllProductFailure(res.data.data))
            yield put(getLoaderActions.disableGeneraleLoader())
        }
    } catch (error) {
        yield put(getAllProductAction.getAllProductFailure(error))
        yield put(getLoaderActions.disableGeneraleLoader())
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getAllProductSaga() {
    yield takeLatest(
        getAllProductTypes.GET_ALL_PRODUCT_REQUEST,
        getAllProductSagas
    )
}
