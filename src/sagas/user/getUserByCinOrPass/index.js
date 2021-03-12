/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getUserByTokenActions, {
    getUserByTokenTypes,
} from '../../../redux/user/getUserByCinOrPass'
import getAllUsersActions from '../../../redux/user/getAllUsers'
import { Post } from '../../../serveur/axios'
import alertActions from '../../../redux/alert'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getUserByTokenSagas({ response }) {
    try {
        const res = yield Post('ss3_users/active', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    getUserByTokenActions.getUserByTokenSuccess(res.data)
                ),
                yield put(getAllUsersActions.getAllUsersRequest()),
                // open popup de success
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: null,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message:
                            'Votre inscription est encours de traitement. Vous receverez vos identifiants par mail dans les 72 heures',
                        title: 'Succés',
                    })
                ),
            ])
        } else {
            yield put(getUserByTokenActions.getUserByTokenFailure(res))
        }
    } catch (error) {
        yield put(getUserByTokenActions.getUserByTokenFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getUserByTokenSaga() {
    yield takeLatest(
        getUserByTokenTypes.GET_USER_BY_TOKEN_REQUEST,
        getUserByTokenSagas
    )
}
