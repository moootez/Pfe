/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getAllDeclarationsActions, {
    getAllDeclarationsTypes,
} from '../../../redux/declaration/getAllDeclarations'
import { Get } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 */
function* getAllDeclarationsSagas() {
    try {
        const res = yield Get('declaration/all')

        if (res.status === 200) {
            yield all([
                yield put(
                    getAllDeclarationsActions.getAllDeclarationsSuccess(
                        res.data.data
                    )
                ),
            ])
        } else {
            yield put(
                getAllDeclarationsActions.getAllDeclarationsFailure(
                    res.data.data
                )
            )
        }
    } catch (error) {
        yield put(getAllDeclarationsActions.getAllDeclarationsFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getAllDeclarationsSaga() {
    yield takeLatest(
        getAllDeclarationsTypes.GET_ALL_DECLARATIONS_REQUEST,
        getAllDeclarationsSagas
    )
}
