/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getFilterDeclarationsEnAttenteDeValidationActions, {
    getFilterDeclarationsEnAttenteDeValidationTypes,
} from '../../../redux/declaration_grab/getfilterDeclaration/getFilterDecEnAttenteDeValidation'
import { Post } from '../../../serveur/axios'
import getFilterDeclarationsEnAttenteDeValidationCDCActions from '../../../redux/declaration_grab/getfilterDeclaration/getFilterDecEnAttenteDeValidationCDC'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getFilterDeclarationsEnAttenteDeValidationSagas({ response }) {
    try {
        const res = yield Post(
            `affectation/list/validateur/${response.id}`,
            response
        )
        if (res.status === 200) {
            if (response.externe === true)
                yield put(
                    getFilterDeclarationsEnAttenteDeValidationCDCActions.getFilterDeclarationsEnAttenteDeValidationCDCSuccess(
                        res.data
                    )
                )
            else
                yield put(
                    getFilterDeclarationsEnAttenteDeValidationActions.getFilterDeclarationsEnAttenteDeValidationSuccess(
                        res.data
                    )
                )
        } else {
            yield put(
                getFilterDeclarationsEnAttenteDeValidationActions.getFilterDeclarationsEnAttenteDeValidationFailure(
                    res.data.data
                )
            )
        }
    } catch (error) {
        yield put(
            getFilterDeclarationsEnAttenteDeValidationActions.getFilterDeclarationsEnAttenteDeValidationFailure(
                error
            )
        )
    }
}

/**
 * appele à la fonction with key action
 */
export function* getFilterDeclarationsEnAttenteDeValidationSaga() {
    yield takeLatest(
        getFilterDeclarationsEnAttenteDeValidationTypes.GET_FILTER_DECLARATIONS_EN_ATTENTE_DE_VALIDATION_REQUEST,
        getFilterDeclarationsEnAttenteDeValidationSagas
    )
}
