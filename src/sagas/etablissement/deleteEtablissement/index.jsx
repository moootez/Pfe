import { takeLatest, put, all } from 'redux-saga/effects'
import deleteEtablissementActions, {
    deleteEtablissementTypes,
} from '../../../redux/etablissement/deleteEtablissement'
// import getFilterEtablissementActions from '../../../redux/etablissement/getFiltreEtablissement'
import { Patch } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* deleteEtablissementSagas({ response }) {
    try {
        const res = yield Patch('etablissement/remove', response.data)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    deleteEtablissementActions.deleteEtablissementSuccess(
                        res.data
                    )
                ),
                // yield put(
                //     getFilterEtablissementActions.getFilterEtablissementRequest()
                // ),
            ])
        } else {
            yield put(
                deleteEtablissementActions.deleteEtablissementFailure(res)
            )
        }
    } catch (error) {
        yield put(deleteEtablissementActions.deleteEtablissementFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* deleteEtablissementSaga() {
    yield takeLatest(
        deleteEtablissementTypes.DELETE_ETABLISSEMENT_REQUEST,
        deleteEtablissementSagas
    )
}
