/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import { goBack } from 'connected-react-router'
import validerRapportActions, {
    validerRapportTypes,
} from '../../../redux/rapport/validerRapport/index'
import { Patch } from '../../../serveur/axios'
import alertActions from '../../../redux/alert'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* validerRapportSagas({ response }) {
    try {
        const res = yield Patch(`rapport/validate/${response}`)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    validerRapportActions.validerRapportSuccess(res.data.data)
                ),
                // open popup de success
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: 'تم تأكيد التقرير',
                    })
                ),
            ])
        } else {
            yield put(
                validerRapportActions.validerRapportFailure(res.data.data)
            )
        }
        if (res.data.data) yield put(goBack())
    } catch (error) {
        yield put(validerRapportActions.validerRapportFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* validerRapportSaga() {
    yield takeLatest(
        validerRapportTypes.VALIDER_RAPPORT_REQUEST,
        validerRapportSagas
    )
}
