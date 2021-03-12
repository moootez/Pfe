import { takeLatest, put, all } from 'redux-saga/effects'
import { goBack } from 'react-router-redux'
import addDeclarationActions, {
    addDeclarationTypes,
} from '../../../redux/declaration/addDeclaration'
import { Post } from '../../../serveur/axios'
import getReceivedActions from '../../../redux/declaration/getReceived'
// import alertActions from '../../../redux/alert'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addDeclarationSagas({ response }) {
    try {
        const res = yield Post('declaration/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    addDeclarationActions.addDeclarationSuccess(res.data)
                ),
                yield put(
                    getReceivedActions.getReceivedRequest(
                        res.data.data.declaration.id
                    )
                ),
                yield put(goBack()),
            ])
        } else {
            yield put(addDeclarationActions.addDeclarationFailure(res))
        }
    } catch (error) {
        yield put(addDeclarationActions.addDeclarationFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* addDeclarationSaga() {
    yield takeLatest(
        addDeclarationTypes.ADD_DECLARATION_REQUEST,
        addDeclarationSagas
    )
}
