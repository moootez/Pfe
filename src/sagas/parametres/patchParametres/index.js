import { takeLatest, put, all } from 'redux-saga/effects'
import patchParametresActions, {
    patchParametresTypes,
} from '../../../redux/parametres/patchParametres'
import { Patch } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* patchParametresSagas({ response }) {
    try {
        const res = yield Patch(`parametre/edit`, response)
        if (res.status === 202 || res.status === 201) {
            yield all([
                yield put(
                    patchParametresActions.patchParametresSuccess(res.data)
                ),
            ])
        } else {
            yield put(patchParametresActions.patchParametresFailure(res))
        }
    } catch (error) {
        yield put(patchParametresActions.patchParametresFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* patchParametresSaga() {
    yield takeLatest(
        patchParametresTypes.PATCH_PARAMETRES_REQUEST,
        patchParametresSagas
    )
}
