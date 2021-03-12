import { takeLatest, put, all } from 'redux-saga/effects'
import { goBack } from 'react-router-redux'
import addDeclarantInterneActions, {
    addDeclarantInterneTypes,
} from '../../../redux/declarantInterne/addDeclarantInterne'
import { Post } from '../../../serveur/axios'
// import alertActions from '../../../redux/alert'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addDeclarantInterneSagas({ response }) {
    try {
        const res = yield Post('users/add_declarant', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    addDeclarantInterneActions.addDeclarantInterneSuccess(
                        res.data
                    )
                ),
                yield put(goBack()),
            ])
        } else {
            yield put(
                addDeclarantInterneActions.addDeclarantInterneFailure(res)
            )
        }
    } catch (error) {
        yield put(addDeclarantInterneActions.addDeclarantInterneFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* addDeclarantInterneSaga() {
    yield takeLatest(
        addDeclarantInterneTypes.ADD_DECLARANT_INTERNE_REQUEST,
        addDeclarantInterneSagas
    )
}
