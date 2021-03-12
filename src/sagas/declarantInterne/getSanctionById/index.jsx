/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getSanctionActions, {
    getSanctionTypes,
} from '../../../redux/declarantInterne/getSanctionById'
import { Get } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getSanctionSagas({ response }) {
    try {
        const res = yield Get(`sanction/consult/${response}`)
        if (res.status === 200) {
            yield all([
                yield put(getSanctionActions.getSanctionSuccess(res.data.data)),
            ])
        } else {
            yield put(getSanctionActions.getSanctionFailure(res.data.data))
        }
    } catch (error) {
        yield put(getSanctionActions.getSanctionFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getSanctionSaga() {
    yield takeLatest(getSanctionTypes.GET_SANCTION_REQUEST, getSanctionSagas)
}
