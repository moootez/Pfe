/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import axios from 'axios'
import loginActions, { loginTypes } from '../../redux/login/index'
import getAllRef from '../../redux/referencial/getAllReferencial'
import alertActions from '../../redux/alert'
// import getAllReferencialActions from '../../redux/referencial/getAllReferencial/index'
import baseUrl from '../../serveur/baseUrl'
import getLoaderActions from '../../redux/wrapApi/index'
import instance from '../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* loginSagas(payload) {
    try {
        yield put(getLoaderActions.activeGeneraleLoader())
        // const response = yield Post('user/auth/login', payload.response)
        const response = yield axios({
            method: 'post',
            url: `${baseUrl}user/auth/login`,
            data: payload.response,
            headers: {
                'Accept-Version': 1,
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
            },
        })

        if (response.data.Token) {
            yield localStorage.setItem('InluccToken', response.data.Token)
            yield localStorage.setItem(
                'role',
                // response.data.User.details.userRoles[0].role
                'ROLE_ADMIN'
            )
            instance.defaults.headers.Authorization = `Bearer ${response.data.Token}`
            yield put(getLoaderActions.disableGeneraleLoader())
            yield put(getAllRef.getAllReferenceSuccess(true))
            yield put(loginActions.loginSuccess(response.data))
            // yield put(
            //     getAllReferencialActions.getAllReferenceRequest({
            //         dontNavigate: true,
            //     })
            // )
        } else {
            yield put(getLoaderActions.disableGeneraleLoader())
            yield all([
                yield put(loginActions.loginFailure(response)),
                // open popup de success
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: true,
                        title: 'خطأ',
                        success: false,
                        message: "Nom d'utilisateur ou mot de passe incorrect",
                    })
                ),
            ])
        }
    } catch (error) {
        yield put(getLoaderActions.disableGeneraleLoader())
        yield put(loginActions.loginFailure(error))
        yield all([
            yield put(
                alertActions.alertShow(true, {
                    onConfirm: false,
                    warning: false,
                    info: false,
                    error: true,
                    title: 'خطأ',
                    success: false,
                    message: "Nom d'utilisateur ou mot de passe incorrect",
                })
            ),
        ])
    }
}

/**
 * appele à la fonction with key action
 */
export function* loginSaga() {
    yield takeLatest(loginTypes.LOGIN_REQUEST, loginSagas)
}
