/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import axios from 'axios'
import getAllUsersActions, {
    getAllUsersTypes,
} from '../../../redux/user/getAllUsers'
import baseUrl from '../../../serveur/baseUrl'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getAllUsersSagas() {
    // const { login } = yield select()
    try {
        const responseAdd = yield axios({
            method: 'post',
            url: `${baseUrl.local}users/all`,
            headers: {
                'Accept-Version': 1,
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${localStorage.InluccToken}`,
            },
            data: {
                key: '',
                limit: 5,
                order: '',
                page: 1,
                role: 2,
                searchData: '',
            },
            timeout: 3000,
        })
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
