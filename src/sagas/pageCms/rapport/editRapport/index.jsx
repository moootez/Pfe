import { takeLatest, put, all } from 'redux-saga/effects'
import { goBack } from 'react-router-redux'
import alertActions from '../../../../redux/alert'
import editRapportContenuActions, {
    editRapportContenuTypes,
} from '../../../../redux/pageCms/rapport/editRapport'
import { Patch } from '../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* editRapportContenuSagas({ response }) {
    try {
        const res = yield Patch(`conteurapport/edit/${response.id}`, response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    editRapportContenuActions.editRapportContenuSuccess(
                        res.data
                    )
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
            yield put(editRapportContenuActions.editRapportContenuFailure(res))
        }
    } catch (error) {
        yield put(editRapportContenuActions.editRapportContenuFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* editRapportContenuSaga() {
    yield takeLatest(
        editRapportContenuTypes.EDIT_RAPPORT_CONTENU_REQUEST,
        editRapportContenuSagas
    )
}
