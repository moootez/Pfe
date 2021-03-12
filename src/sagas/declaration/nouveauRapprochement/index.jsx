/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
// import { goBack } from 'connected-react-router'
import alertActions from '../../../redux/alert'
import nouveauRapprochementActions, {
    nouveauRapprochementTypes,
} from '../../../redux/declaration/nouveauRapprochement'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* nouveauRapprochementSagas({ response }) {
    try {
        const res = yield Post(
            `affectation/new/for-validation/${response.id_declaration}`
        )
        if (res.status === 200) {
            yield all([
                yield put(
                    nouveauRapprochementActions.nouveauRapprochementSuccess(
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
                    })
                ),
                // yield put(goBack()),
            ])
        } else {
            yield put(
                nouveauRapprochementActions.nouveauRapprochementFailure(
                    res.data
                )
            )
        }
    } catch (error) {
        yield put(
            nouveauRapprochementActions.nouveauRapprochementFailure(error)
        )
    }
}

/**
 * appele à la fonction with key action
 */
export function* nouveauRapprochementSaga() {
    yield takeLatest(
        nouveauRapprochementTypes.NOUVEAU_RAPPROCHEMENT_REQUEST,
        nouveauRapprochementSagas
    )
}
