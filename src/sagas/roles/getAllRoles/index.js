/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getAllRolesActions, {
    getAllRolesTypes,
} from '../../../redux/roles/getAllRoles'
import { Get } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getAllRolesSagas() {
    try {
        const responseAdd = yield Get('ss3_user/roles/')
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
