/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getUsersByRoleActions, {
    getUsersByRoleTypes,
} from '../../../redux/user/getUsersByRole'
import { Get } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getUsersByRoleSagas({ response }) {
    try {
        const res = yield Get(`users/list/${response}`)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    getUsersByRoleActions.getUsersByRoleSuccess(res.data.data)
                ),
            ])
        } else {
            yield put(getUsersByRoleActions.getUsersByRoleFailure(res.data))
        }
    } catch (error) {
        yield put(getUsersByRoleActions.getUsersByRoleFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getUsersByRoleSaga() {
    yield takeLatest(
        getUsersByRoleTypes.GET_USERS_BY_ROLE_REQUEST,
        getUsersByRoleSagas
    )
}
