/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import { goBack } from 'react-router-redux'
import editUserActions, { editUserTypes } from '../../../redux/user/editUser'
import getAllUsersActions from '../../../redux/user/getAllUsers'
// import loginActions from '../../../redux/login'
import { Patch } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* editUserSagas({ response }) {
    try {
        const res = yield Patch(`users/${response.id}`, response)
        if (res.status === 200 || res.status === 201 || res.status === 202) {
            yield all([
                yield put(editUserActions.editUserSuccess(res.data)),
                // yield put(
                //     loginActions.loginSuccess({
                //         User: { details: res.data.data },
                //         Token: localStorage.getItem('inluccToken'),
                //     })
                // ),
                yield put(getAllUsersActions.getAllUsersRequest()),
            ])
            yield put(goBack())
        } else {
            yield put(editUserActions.editUserFailure(res))
        }
    } catch (error) {
        yield put(editUserActions.editUserFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* editUserSaga() {
    yield takeLatest(editUserTypes.EDIT_USER_REQUEST, editUserSagas)
}
