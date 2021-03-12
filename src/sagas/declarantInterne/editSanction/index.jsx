import { takeLatest, put, all } from 'redux-saga/effects'
import editSanctionActions, {
    editSanctionTypes,
} from '../../../redux/declarantInterne/editSanction'
import { Patch } from '../../../serveur/axios'
// import alertActions from '../../../redux/alert'
import getDeclarantSanctionActions from '../../../redux/declarantInterne/getDeclarantSanction'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* editSanctionSagas({ response }) {
    try {
        const res = yield Patch(`sanction/${response.id}`, response)
        if (res.status === 200 || res.status === 202) {
            yield all([
                yield put(editSanctionActions.editSanctionSuccess(res.data)),
                yield put(
                    getDeclarantSanctionActions.getDeclarantSanctionRequest(
                        response.idDeclarant
                    )
                ),
            ])
        } else {
            yield put(editSanctionActions.editSanctionFailure(res))
        }
    } catch (error) {
        yield put(editSanctionActions.editSanctionFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* editSanctionSaga() {
    yield takeLatest(editSanctionTypes.EDIT_SANCTION_REQUEST, editSanctionSagas)
}
