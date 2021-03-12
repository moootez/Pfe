import { takeLatest, put, all } from 'redux-saga/effects'
import addRapportActions, {
    addRapportTypes,
} from '../../../redux/rapport/saisie/index'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addRapportSagas({ response }) {
    try {
        const res = yield Post('rapport/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addRapportActions.addRapportSuccess(res.data)),
            ])
        } else {
            yield put(addRapportActions.addRapportFailure(res))
        }
    } catch (error) {
        yield put(addRapportActions.addRapportFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* addRapportSaga() {
    yield takeLatest(addRapportTypes.ADD_RAPPORT_REQUEST, addRapportSagas)
}
