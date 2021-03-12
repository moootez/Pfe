/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getActionsActions, {
    getActionsTypes,
} from '../../../../../redux/declaration_grab/bien/actions/getActions/index'
import { Get } from '../../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getActionsSagas({ response }) {
    try {
        const res = yield Get(`action/${response}`)
        if (res.status === 200) {
            yield put(getActionsActions.getActionsSuccess(res.data))
        } else {
            yield put(getActionsActions.getActionsFailure(res.data))
        }
    } catch (error) {
        yield put(getActionsActions.getActionsFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getActionsSaga() {
    yield takeLatest(getActionsTypes.GET_ACTIONS_REQUEST, getActionsSagas)
}
