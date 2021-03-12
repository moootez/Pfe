import { takeLatest, put, all } from 'redux-saga/effects'
import getRapportContenuActions, {
    getRapportContenuTypes,
} from '../../../../redux/pageCms/rapport/getRapport'
import { Get } from '../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 */
function* getRapportContenuSagas() {
    try {
        const res = yield Get(`conteurapport/all`)
        console.log('Testresdaya', res.data)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    getRapportContenuActions.getRapportContenuSuccess(res.data)
                ),
            ])
        } else {
            yield put(getRapportContenuActions.getRapportContenuFailure(res))
        }
    } catch (error) {
        yield put(getRapportContenuActions.getRapportContenuFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getRapportContenuSaga() {
    yield takeLatest(
        getRapportContenuTypes.GET_RAPPORT_CONTENU_REQUEST,
        getRapportContenuSagas
    )
}
