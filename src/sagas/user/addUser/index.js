/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import { goBack } from 'react-router-redux'
import addUserActions, { addUserTypes } from '../../../redux/user/addUser'
// import getAllUsersActions from '../../../redux/user/getAllUsers'
import alertActions from '../../../redux/alert'
import { Post } from '../../../serveur/axios'
import getAllUsersActions from '../../../redux/user/getAllUsers'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addUserSagas({ response }) {
    try {
        const res = yield Post('ss3_users/inscription', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addUserActions.addUserSuccess(res.data)),

                yield put(getAllUsersActions.getAllUsersRequest()),
            ])
            if (res.data.preview === 'true') {
                // open popup de success
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message:
                            response.language === 'ar'
                                ? 'تتم معالجة التسجيل الخاص بك. سوف تتلقى معرفاتك عن طريق البريد الإلكتروني في غضون 72 ساعة'
                                : 'Votre inscription est en cours de traitement. Vous receverez vos identifiants par mail dans les 72 heures',
                        title: response.language === 'ar' ? 'تم' : 'Succés',
                    })
                )
            }
            yield put(goBack())
        } else {
            yield put(addUserActions.addUserFailure(res))
        }
    } catch (error) {
        yield put(addUserActions.addUserFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* addUserSaga() {
    yield takeLatest(addUserTypes.ADD_USER_REQUEST, addUserSagas)
}
