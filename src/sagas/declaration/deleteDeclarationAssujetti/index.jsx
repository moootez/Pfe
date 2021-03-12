import { takeLatest, put, all } from 'redux-saga/effects'
import { goBack } from 'react-router-redux'
import deleteDeclarationAssujettiActions, {
    deleteDeclarationAssujettiTypes,
} from '../../../redux/declaration/deleteDeclarationAssujetti'
import { Delete } from '../../../serveur/axios'
// import alertActions from '../../../redux/alert'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* deleteDeclarationAssujettiSagas({ response }) {
    try {
        const res = yield Delete(`assujettideclaration/${response.id}`)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    deleteDeclarationAssujettiActions.deleteDeclarationAssujettiSuccess(
                        res.data
                    )
                ),
                yield put(goBack()),
            ])
        } else {
            yield put(
                deleteDeclarationAssujettiActions.deleteDeclarationAssujettiFailure(
                    res
                )
            )
        }
    } catch (error) {
        yield put(
            deleteDeclarationAssujettiActions.deleteDeclarationAssujettiFailure(
                error
            )
        )
    }
}

/**
 * appele à la fonction with key action
 */
export default function* deleteDeclarationAssujettiSaga() {
    yield takeLatest(
        deleteDeclarationAssujettiTypes.DELETE_DECLARATION_ASSUJETTI_REQUEST,
        deleteDeclarationAssujettiSagas
    )
}
