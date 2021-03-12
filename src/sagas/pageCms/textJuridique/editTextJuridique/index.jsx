import { takeLatest, put, all } from 'redux-saga/effects'
import { goBack } from 'react-router-redux'
import alertActions from '../../../../redux/alert'
import editTextJuridiqueActions, {
    editTextJuridiqueTypes,
} from '../../../../redux/pageCms/textJuridique/editTextJuridique'
import { Patch } from '../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* editTextJuridiqueSagas({ response }) {
    try {
        const res = yield Patch(`textejuridique/edit/${response.id}`, response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    editTextJuridiqueActions.editTextJuridiqueSuccess(res.data)
                ),
                // open popup de success
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: 'تم التعديل  بنجاح',
                    })
                ),
                yield put(goBack()),
            ])
        } else {
            yield put(editTextJuridiqueActions.editTextJuridiqueFailure(res))
        }
    } catch (error) {
        yield put(editTextJuridiqueActions.editTextJuridiqueFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* editTextJuridiqueSaga() {
    yield takeLatest(
        editTextJuridiqueTypes.EDIT_TEXT_JURIDIQUE_REQUEST,
        editTextJuridiqueSagas
    )
}
