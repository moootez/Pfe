import { takeLatest, put, all } from 'redux-saga/effects'
import getReceivedRecuActions, {
    getReceivedRecuTypes,
} from '../../../redux/declaration/getReceivedRecu'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getReceivedRecuSagas({ response }) {
    try {
        const res = yield Post(
            `recivedpdf/${response.idDeclaration}`,
            response.payload
        )
        if (res.status === 200 || res.status === 201) {
            window.open(res.data.data.path, '_blank')
            yield all([
                yield put(
                    getReceivedRecuActions.getReceivedRecuSuccess(res.data)
                ),
            ])
        } else {
            yield put(getReceivedRecuActions.getReceivedRecuFailure(res))
        }
    } catch (error) {
        yield put(getReceivedRecuActions.getReceivedRecuFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getReceivedRecuSaga() {
    yield takeLatest(
        getReceivedRecuTypes.GET_RECEIVED_RECU_REQUEST,
        getReceivedRecuSagas
    )
}
