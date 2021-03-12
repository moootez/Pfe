/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getAllRapportActions, {
    getAllRapportTypes,
} from '../../../redux/rapport/getAllRapport/index'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getAllRapportSagas({ response }) {
    try {
        const res = yield Post(`rapport/`, response)
        if (res.status === 200) {
            yield put(getAllRapportActions.getAllRapportSuccess(res.data))
        } else {
            yield put(getAllRapportActions.getAllRapportFailure(res.data.data))
        }
    } catch (error) {
        yield put(getAllRapportActions.getAllRapportFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getAllRapportSaga() {
    yield takeLatest(
        getAllRapportTypes.GET_ALL_RAPPORT_REQUEST,
        getAllRapportSagas
    )
}
