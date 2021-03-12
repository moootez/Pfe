/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getCodePostalByGovActions, {
    getCodePostalByGovTypes,
} from '../../../redux/referencial/getCodePostalByGov'
import { Get } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getCodePostalByGovSagas({ response }) {
    if (response)
        try {
            const responseGet = yield Get(
                `referenciel/${response}-code-postale-for-gouvornourat`
            )
            if (responseGet.status === 200 || responseGet.status === 201) {
                yield all([
                    yield put(
                        getCodePostalByGovActions.getCodePostalByGovSuccess(
                            responseGet.data
                        )
                    ),
                ])
            } else {
                yield put(
                    getCodePostalByGovActions.getCodePostalByGovFailure(
                        responseGet.data
                    )
                )
            }
        } catch (error) {
            yield put(
                getCodePostalByGovActions.getCodePostalByGovFailure(error)
            )
        }
}

/**
 * appele à la fonction with key action
 */
export function* getCodePostalByGovSaga() {
    yield takeLatest(
        getCodePostalByGovTypes.GET_CODE_POSTAL_BY_GOV_REQUEST,
        getCodePostalByGovSagas
    )
}
