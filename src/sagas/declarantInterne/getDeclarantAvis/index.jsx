/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getDeclarantAvisActions, {
    getDeclarantAvisTypes,
} from '../../../redux/declarantInterne/getDeclarantAvis'
import { Get } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getDeclarantAvisSagas({ response }) {
    try {
        const res = yield Get(`avis/${response}`)
        if (res.status === 200) {
            yield all([
                yield put(
                    getDeclarantAvisActions.getDeclarantAvisSuccess(
                        res.data.data
                    )
                ),
            ])
        } else {
            yield put(
                getDeclarantAvisActions.getDeclarantAvisFailure(res.data.data)
            )
        }
    } catch (error) {
        yield put(getDeclarantAvisActions.getDeclarantAvisFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getDeclarantAvisSaga() {
    yield takeLatest(
        getDeclarantAvisTypes.GET_DECLARANT_AVIS_REQUEST,
        getDeclarantAvisSagas
    )
}
