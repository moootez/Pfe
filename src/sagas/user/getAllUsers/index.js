/* eslint-disable import/prefer-default-export */
import { takeLatest, put, call, all, select } from 'redux-saga/effects' // eslint-disable-line
import getAllUsersActions, {
    getAllUsersTypes,
} from '../../../redux/user/getAllUsers'
import instance, { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getAllUsersSagas({ response }) {
    const { login } = yield select()
    instance.defaults.headers.Authorization = `Bearer ${login.response.Token}`
    try {
        const responseAdd = yield Post('ss3_users/all', response)
        if (responseAdd.status === 200) {
            yield all([
                yield put(
                    getAllUsersActions.getAllUsersSuccess(responseAdd.data)
                ),
            ])
        } else {
            yield put(getAllUsersActions.getAllUsersFailure(responseAdd.data))
        }
    } catch (error) {
        yield put(getAllUsersActions.getAllUsersFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getAllUsersSaga() {
    yield takeLatest(getAllUsersTypes.GET_ALL_USERS_REQUEST, getAllUsersSagas)
}
