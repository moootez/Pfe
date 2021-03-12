/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getDeclarationActions, {
    getDeclarationTypes,
} from '../../../redux/declaration/declarant'
import { Get } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getDeclarationSagas({ response }) {
    const res = yield Get(`declaration/${response}`)

    try {
        if (res.status === 200) {
            yield put(getDeclarationActions.getDeclarationSuccess(res.data))
        } else {
            yield put(
                getDeclarationActions.getDeclarationFailure(res.data.data)
            )
        }
    } catch (error) {
        yield put(getDeclarationActions.getDeclarationFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getDeclarationSaga() {
    yield takeLatest(
        getDeclarationTypes.GET_DECLARATION_REQUEST,
        getDeclarationSagas
    )
}
