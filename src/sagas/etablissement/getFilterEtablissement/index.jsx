/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getFilterEtablissementActions, {
    getFilterEtablissementTypes,
} from '../../../redux/etablissement/getFiltreEtablissement'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getFilterEtablissementSagas({ response }) {
    try {
        const res = yield Post(`etablissement/all`, response)
        if (res.status === 200) {
            yield put(
                getFilterEtablissementActions.getFilterEtablissementSuccess(
                    res.data
                )
            )
        } else {
            yield put(
                getFilterEtablissementActions.getFilterEtablissementFailure(
                    res.data
                )
            )
        }
    } catch (error) {
        yield put(
            getFilterEtablissementActions.getFilterEtablissementFailure(error)
        )
    }
}

/**
 * appele à la fonction with key action
 */
export function* getFilterEtablissementSaga() {
    yield takeLatest(
        getFilterEtablissementTypes.GET_FILTER_ETABLISSEMENT_REQUEST,
        getFilterEtablissementSagas
    )
}
