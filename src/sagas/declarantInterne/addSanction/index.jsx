import { takeLatest, put, all } from 'redux-saga/effects'
import addSanctionActions, {
    addSanctionTypes,
} from '../../../redux/declarantInterne/addSanction'
import { Post } from '../../../serveur/axios'
// import alertActions from '../../../redux/alert'
import getDeclarantSanctionActions from '../../../redux/declarantInterne/getDeclarantSanction'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addSanctionSagas({ response }) {
    try {
        const res = yield Post('sanction/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addSanctionActions.addSanctionSuccess(res.data)),
                yield put(
                    getDeclarantSanctionActions.getDeclarantSanctionRequest(
                        response.declarant
                    )
                ),
            ])
        } else {
            yield put(addSanctionActions.addSanctionFailure(res))
        }
    } catch (error) {
        yield put(addSanctionActions.addSanctionFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* addSanctionSaga() {
    yield takeLatest(addSanctionTypes.ADD_SANCTION_REQUEST, addSanctionSagas)
}
