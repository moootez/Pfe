/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getIdentiteDeclarantPublicationActions, {
    getIdentiteDeclarantTypes,
} from '../../../../../redux/publication/formatPublication/identiteDeclarant/getIdentiteDeclarant'
import { Get } from '../../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getIdentiteDeclarantPublicationSagas() {
    try {
        const res = yield Get('publication/filtre/RefAppUser')
        if (res.status === 200 || res.status === 201) {
            yield put(
                getIdentiteDeclarantPublicationActions.getIdentiteDeclarantPublicationSuccess(
                    res.data
                )
            )
        } else {
            yield put(
                getIdentiteDeclarantPublicationActions.getIdentiteDeclarantPublicationFailure(
                    res.data
                )
            )
        }
    } catch (error) {
        yield put(
            getIdentiteDeclarantPublicationActions.getIdentiteDeclarantPublicationFailure(
                error
            )
        )
    }
}

/**
 * appele à la fonction with key action
 */
export function* getIdentiteDeclarantPublicationSaga() {
    yield takeLatest(
        getIdentiteDeclarantTypes.GET_IDENTITE_DECLARANT_PUBLICATION_REQUEST,
        getIdentiteDeclarantPublicationSagas
    )
}
