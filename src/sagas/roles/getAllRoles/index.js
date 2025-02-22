/* eslint-disable import/prefer-default-export */
import axios from 'axios'
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getAllRolesActions, {
    getAllRolesTypes,
} from '../../../redux/roles/getAllRoles'
import baseUrl from '../../../serveur/baseUrl'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getAllRolesSagas() {
    try {
        const { OpaliaToken } = window.localStorage
        const responseAdd = yield axios({
            method: 'get',
            url: `${baseUrl}user/roles/`,
            headers: {
                'Accept-Version': 1,
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${OpaliaToken}`
            },
            timeout: 10000,
        })
        if (responseAdd.status === 200) {
            yield all([
                yield put(
                    getAllRolesActions.getAllRolesSuccess(responseAdd.data)
                ),
            ])
        } else {
            yield put(getAllRolesActions.getAllRolesFailure(responseAdd.data))
        }
    } catch (error) {
        yield put(getAllRolesActions.getAllRolesFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getAllRolesSaga() {
    yield takeLatest(getAllRolesTypes.GET_ALL_ROLES_REQUEST, getAllRolesSagas)
}
