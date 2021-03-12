import { takeLatest, put, all } from 'redux-saga/effects'
import { goBack } from 'react-router-redux'
import refusInscriptionActions, {
    refusInscriptionTypes,
} from '../../../redux/inscription/refusInscription'
import { Patch } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* refusInscriptionSagas({ response }) {
    try {
        const res = yield Patch(
            `declarant-inscription/refusInscription/${response.id}`,
            response
        )
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    refusInscriptionActions.refusInscriptionSuccess(res.data)
                ),
                yield put(goBack()),
            ])
        } else {
            yield put(refusInscriptionActions.refusInscriptionFailure(res))
        }
    } catch (error) {
        yield put(refusInscriptionActions.refusInscriptionFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* refusInscriptionSaga() {
    yield takeLatest(
        refusInscriptionTypes.REFUS_INSCRIPTION_REQUEST,
        refusInscriptionSagas
    )
}
