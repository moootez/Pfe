/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects'
import { goBack } from 'react-router-redux'
import sendEmailActions, { sendEmailTypes } from '../../../redux/user/sendEmail'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* sendEmailSagas({ response }) {
    try {
        const res = yield Post('ss3_users/forget', response)
        if (res.status === 200 || res.status === 201) {
            yield all([yield put(sendEmailActions.sendEmailSuccess(res.data))])
        } else {
            yield put(sendEmailActions.sendEmailFailure(res))
        }
        yield new Promise(resolve => setTimeout(resolve, 1000))
        yield put(goBack())
    } catch (error) {
        yield put(sendEmailActions.sendEmailFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* sendEmailSaga() {
    yield takeLatest(sendEmailTypes.SEND_EMAIL_REQUEST, sendEmailSagas)
}
