import { takeLatest, put, all } from 'redux-saga/effects'
import addAvisActions, {
    addAvisTypes,
} from '../../../redux/declarantInterne/addAvis'
import { Post } from '../../../serveur/axios'
// import alertActions from '../../../redux/alert'
import getDeclarantAvisActions from '../../../redux/declarantInterne/getDeclarantAvis'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addAvisSagas({ response }) {
    try {
        const res = yield Post('avis/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addAvisActions.addAvisSuccess(res.data)),
                yield put(
                    getDeclarantAvisActions.getDeclarantAvisRequest(
                        response.declarant
                    )
                ),
            ])
        } else {
            yield put(addAvisActions.addAvisFailure(res))
        }
    } catch (error) {
        yield put(addAvisActions.addAvisFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* addAvisSaga() {
    yield takeLatest(addAvisTypes.ADD_AVIS_REQUEST, addAvisSagas)
}
