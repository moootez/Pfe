import { takeLatest, put, all } from 'redux-saga/effects'
import { goBack } from 'react-router-redux'
import updateInscriptionActions, {
    updateInscriptionStatusTypes,
} from '../../../redux/inscription/validateInscription'
import { Patch } from '../../../serveur/axios'
import alertActions from '../../../redux/alert'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* changeInscriptionSagas({ response }) {
    try {
        const res = yield Patch(
            `declarant-inscription/${response.id}`,
            response
        )
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    updateInscriptionActions.updateInscriptionStatusSuccess()
                ),
                // open popup de success
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: 'تم بنجاح',
                    })
                ),
                yield put(goBack()),
            ])
        } else {
            yield put(
                updateInscriptionActions.updateInscriptionStatusFailure(res)
            )
        }
    } catch (error) {
        yield put(
            updateInscriptionActions.updateInscriptionStatusFailure(error)
        )
    }
}

/**
 * appele à la fonction with key action
 */
export default function* changeInscriptionSaga() {
    yield takeLatest(
        updateInscriptionStatusTypes.UPDATE_INSCRIPTION_STATUS_REQUEST,
        changeInscriptionSagas
    )
}
