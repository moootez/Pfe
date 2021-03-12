import { takeLatest, put, all } from 'redux-saga/effects'
import { goBack } from 'react-router-redux'
import addDeclarationAssujettiActions, {
    addDeclarationAssujettiTypes,
} from '../../../redux/declaration/addDeclarationAssujetti'
import { Post } from '../../../serveur/axios'
// import alertActions from '../../../redux/alert'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addDeclarationAssujettiSagas({ response }) {
    try {
        const res = yield Post('assujettideclaration/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    addDeclarationAssujettiActions.addDeclarationAssujettiSuccess(
                        res.data
                    )
                ),
                yield put(goBack()),
            ])
        } else {
            yield put(
                addDeclarationAssujettiActions.addDeclarationAssujettiFailure(
                    res
                )
            )
        }
    } catch (error) {
        yield put(
            addDeclarationAssujettiActions.addDeclarationAssujettiFailure(error)
        )
    }
}

/**
 * appele à la fonction with key action
 */
export default function* addDeclarationAssujettiSaga() {
    yield takeLatest(
        addDeclarationAssujettiTypes.ADD_DECLARATION_ASSUJETTI_REQUEST,
        addDeclarationAssujettiSagas
    )
}
