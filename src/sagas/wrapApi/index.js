/* eslint-disable import/prefer-default-export */
import { takeLatest, put, select } from 'redux-saga/effects'
// eslint-disable-line
import wrapApiActions, { wrapApiTypes } from '../../redux/wrapApi/index'
import instance from '../../serveur/axios'
import alertActions from '../../redux/alert'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* wrapApiPut(payload) {
    try {
        if (payload.response.status >= 201 && payload.response.status < 226) {
            yield put(
                alertActions.alertShow(true, {
                    onConfirm: false,
                    warning: false,
                    info: false,
                    error: false,
                    success: true,
                    message: payload.response.data.message.fr,
                })
            )
        }
    } catch (error) {
        yield put(wrapApiActions.wrapApiPutFailure(error))
    }
}

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* wrapApiCall() {
    try {
        const { login } = yield select()
        const { OpaliaToken } = window.localStorage
        if (login.response) {
            if (login.response.Token) {
                if (
                    login.response.expirationDate < Date.now() / 1000 ||
                    !OpaliaToken
                ) {
                    localStorage.setItem('OpaliaToken', '')
                    yield put({ type: 'SIGNOUT_REQUEST' })
                } else {
                    instance.defaults.headers.Authorization = `Bearer ${login.response.Token}`
                }
            } else {
                localStorage.setItem('OpaliaToken', '')
                yield put({ type: 'SIGNOUT_REQUEST' })
            }
        }

        // const { reactoken } = window.localStorage
        // instance.defaults.headers.Authorization = `Bearer ${reactoken}`
    } catch (error) {
        yield put(wrapApiActions.wrapApiCallFailure(error))
    }
}
/**
 * appele à la fonction with key action
 */
export function* wrapApi() {
    yield takeLatest(wrapApiTypes.WRAP_API_PUT, wrapApiPut)
    yield takeLatest(wrapApiTypes.WRAP_API_CALL, wrapApiCall)
    yield takeLatest(wrapApiTypes.WRAP_API_PUT_FAILURE, wrapApiPut)
}
