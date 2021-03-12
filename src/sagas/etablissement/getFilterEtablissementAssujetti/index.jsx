/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getFilterEtablissementAssujettiActions, {
    getFilterEtablissementAssujettiTypes,
} from '../../../redux/etablissement/getFilterEtablissementAssujetti'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getFilterEtablissementAssujettiSagas({ response }) {
    try {
        const res = yield Post(`referenciel/etablissements`, response)
        if (res.status === 200) {
            yield put(
                getFilterEtablissementAssujettiActions.getFilterEtablissementAssujettiSuccess(
                    res.data
                )
            )
        } else {
            yield put(
                getFilterEtablissementAssujettiActions.getFilterEtablissementAssujettiFailure(
                    res.data
                )
            )
        }
    } catch (error) {
        yield put(
            getFilterEtablissementAssujettiActions.getFilterEtablissementAssujettiFailure(
                error
            )
        )
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getFilterEtablissementAssujettiSaga() {
    yield takeLatest(
        getFilterEtablissementAssujettiTypes.GET_FILTER_ETABLISSEMENT_ASSUJETTI_REQUEST,
        getFilterEtablissementAssujettiSagas
    )
}
