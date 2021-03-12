import { takeLatest, put, all } from 'redux-saga/effects'
import { goBack } from 'react-router-redux'
import alertActions from '../../../../redux/alert'
import addRapportContenuActions, {
    addRapportContenuTypes,
} from '../../../../redux/pageCms/rapport/addRapport'
import { Post } from '../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addRapportContenuSagas({ response }) {
    try {
        const res = yield Post(`conteurapport/new`, response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    addRapportContenuActions.addRapportContenuSuccess(res.data)
                ),
                // open popup de success
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: 'تم الإضافة  بنجاح',
                    })
                ),
                yield put(goBack()),
            ])
        } else {
            yield put(addRapportContenuActions.addRapportContenuFailure(res))
        }
    } catch (error) {
        yield put(addRapportContenuActions.addRapportContenuFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* addRapportContenuSaga() {
    yield takeLatest(
        addRapportContenuTypes.ADD_RAPPORT_CONTENU_REQUEST,
        addRapportContenuSagas
    )
}
