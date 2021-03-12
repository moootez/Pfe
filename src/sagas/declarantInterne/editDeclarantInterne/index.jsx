import { takeLatest, put, all } from 'redux-saga/effects'
import { goBack } from 'react-router-redux'
import editDeclarantInterneActions, {
    editDeclarantInterneTypes,
} from '../../../redux/declarantInterne/editDeclarantInterne'
import { Patch } from '../../../serveur/axios'
// import alertActions from '../../../redux/alert'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* editDeclarantInterneSagas({ response }) {
    try {
        const res = yield Patch(`users/${response.id}`, response.payload)
        if (res.status === 200 || res.status === 202) {
            yield all([
                yield put(
                    editDeclarantInterneActions.editDeclarantInterneSuccess(
                        res.data
                    )
                ),
                yield put(goBack()),
            ])
        } else {
            yield put(
                editDeclarantInterneActions.editDeclarantInterneFailure(res)
            )
        }
    } catch (error) {
        yield put(
            editDeclarantInterneActions.editDeclarantInterneFailure(error)
        )
    }
}

/**
 * appele à la fonction with key action
 */
export default function* editDeclarantInterneSaga() {
    yield takeLatest(
        editDeclarantInterneTypes.EDIT_DECLARANT_INTERNE_REQUEST,
        editDeclarantInterneSagas
    )
}
