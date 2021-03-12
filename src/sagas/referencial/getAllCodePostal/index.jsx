/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getAllCodePostalActions, {
    getAllCodePostalTypes,
} from '../../../redux/referencial/getAllCodePostal'
import { Get } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getAllCodePostalSagas() {
    try {
        const responseGet = yield Get('referenciel/code-postals')
        if (responseGet.status === 200 || responseGet.status === 201) {
            yield put(
                getAllCodePostalActions.getAllCodePostalSuccess(
                    responseGet.data.data
                )
            )
        } else {
            yield put(
                getAllCodePostalActions.getAllCodePostalFailure(
                    responseGet.data
                )
            )
        }
    } catch (error) {
        yield put(getAllCodePostalActions.getAllCodePostalFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getAllCodePostalSaga() {
    yield takeLatest(
        getAllCodePostalTypes.GET_ALL_CODE_POSTAL_REQUEST,
        getAllCodePostalSagas
    )
}
