/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getObjSpeciauxActions, {
    getObjSpeciauxTypes,
} from '../../../../../redux/declaration_grab/bien/objSpeciaux/getObjSpeciaux/index'
import { Get } from '../../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getObjSpeciauxSagas({ response }) {
    try {
        const res = yield Get(`objectprecious/${response}`)
        if (res.status === 200) {
            yield put(getObjSpeciauxActions.getObjSpeciauxSuccess(res.data))
        } else {
            yield put(getObjSpeciauxActions.getObjSpeciauxFailure(res.data))
        }
    } catch (error) {
        yield put(getObjSpeciauxActions.getObjSpeciauxFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getObjSpeciauxSaga() {
    yield takeLatest(
        getObjSpeciauxTypes.GET_OBJ_SPECIAUX_REQUEST,
        getObjSpeciauxSagas
    )
}
