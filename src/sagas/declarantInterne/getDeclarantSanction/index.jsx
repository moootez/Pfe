/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getDeclarantSanctionActions, {
    getDeclarantSanctionTypes,
} from '../../../redux/declarantInterne/getDeclarantSanction'
import { Get } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getDeclarantSanctionSagas({ response }) {
    try {
        const res = yield Get(`sanction/${response}`)
        if (res.status === 200) {
            yield all([
                yield put(
                    getDeclarantSanctionActions.getDeclarantSanctionSuccess(
                        res.data.data
                    )
                ),
            ])
        } else {
            yield put(
                getDeclarantSanctionActions.getDeclarantSanctionFailure(
                    res.data.data
                )
            )
        }
    } catch (error) {
        yield put(
            getDeclarantSanctionActions.getDeclarantSanctionFailure(error)
        )
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getDeclarantSanctionSaga() {
    yield takeLatest(
        getDeclarantSanctionTypes.GET_DECLARANT_SANCTION_REQUEST,
        getDeclarantSanctionSagas
    )
}
