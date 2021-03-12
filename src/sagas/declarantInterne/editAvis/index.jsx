import { takeLatest, put, all } from 'redux-saga/effects'
import editAvisActions, {
    editAvisTypes,
} from '../../../redux/declarantInterne/editAvis'
import { Patch } from '../../../serveur/axios'
// import alertActions from '../../../redux/alert'
import getDeclarantAvisActions from '../../../redux/declarantInterne/getDeclarantAvis'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* editAvisSagas({ response }) {
    try {
        const res = yield Patch(`avis/${response.id}`, response)
        if (res.status === 200 || res.status === 202) {
            yield all([
                yield put(editAvisActions.editAvisSuccess(res.data)),
                yield put(
                    getDeclarantAvisActions.getDeclarantAvisRequest(
                        response.idDeclarant
                    )
                ),
            ])
        } else {
            yield put(editAvisActions.editAvisFailure(res))
        }
    } catch (error) {
        yield put(editAvisActions.editAvisFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* editAvisSaga() {
    yield takeLatest(editAvisTypes.EDIT_AVIS_REQUEST, editAvisSagas)
}
