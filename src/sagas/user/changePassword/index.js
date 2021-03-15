/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import changePasswordActions, {
    changePasswordTypes,
} from '../../../redux/user/changePassword'
import { Put } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* changePasswordSagas({ response }) {
    try {
        const res = yield Put(`users/change_password`, response)

        if (res.status === 200 || res.status === 201 || res.status === 202) {
            yield all([
                yield put(
                    changePasswordActions.changePasswordSuccess(res.data)
                ),
            ])
        } else {
            yield put(changePasswordActions.changePasswordFailure(res))
        }
    } catch (error) {
        yield put(changePasswordActions.changePasswordFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* changePasswordSaga() {
    yield takeLatest(
        changePasswordTypes.CHANGE_PASSWORD_REQUEST,
        changePasswordSagas
    )
}
