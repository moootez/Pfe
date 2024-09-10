/* eslint-disable import/prefer-default-export */
/* eslint-disable no-restricted-globals */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import axios from 'axios'
import loginActions, { loginTypes } from '../../redux/login/index'

import alertActions from '../../redux/alert'
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
        })

        if (response.data.Token) {
            yield localStorage.setItem(
                'countlogin',
                response.data.User.details.firstLogin
            )
            yield localStorage.setItem(
                'email',
                response.data.User.details.email
            )
            console.log(response.data.User.details.email)
            yield localStorage.setItem('nom', response.data.User.details.nom)
            yield localStorage.setItem(
                'prenom',
                response.data.User.details.prenom
            )
            if (response.data.User.details.tel === null) {
                yield localStorage.setItem('tel', '')
            } else {
                yield localStorage.setItem(
                    'tel',
                    response.data.User.details.tel
                )
            }
            yield localStorage.setItem(
                'codeInsc',
                response.data.User.details.codeInsc
            )

            yield localStorage.setItem('OpaliaToken', response.data.Token)
            yield localStorage.setItem(
                'role',
                response.data.User.details.userRoles[0].role
            )
            yield localStorage.setItem('id_user', response.data.User.details.id)
            yield localStorage.setItem(
                'username',
                response.data.User.details.username
            )
            instance.defaults.headers.Authorization = `Bearer ${response.data.Token}`
            yield put(getLoaderActions.disableGeneraleLoader())

            yield put(loginActions.loginSuccess(response.data))
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
                        title: 'Erreur',
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
                    title: 'Erreur',
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
