/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getDeclarantInterneActions, {
    getDeclarantInterneTypes,
} from '../../../redux/declarantInterne/getDeclarantById'
import { Get } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getDeclarantInterneSagas({ response }) {
    try {
        const res = yield Get(`declarant/${response}`)
        if (res.status === 200) {
            yield all([
                yield put(
                    getDeclarantInterneActions.getDeclarantInterneSuccess(
                        res.data.message
                    )
                ),
            ])
        } else {
            yield put(
                getDeclarantInterneActions.getDeclarantInterneFailure(
                    res.data.message
                )
            )
        }
    } catch (error) {
        yield put(getDeclarantInterneActions.getDeclarantInterneFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getDeclarantInterneSaga() {
    yield takeLatest(
        getDeclarantInterneTypes.GET_DECLARANT_INTERNE_REQUEST,
        getDeclarantInterneSagas
    )
}
