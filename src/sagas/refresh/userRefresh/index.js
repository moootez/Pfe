/* eslint-disable import/prefer-default-export */
import axios from 'axios'
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import alertActions from '../../../redux/alert'
import getAllUsersActions from '../../../redux/user/getAllUsers'
import baseUrl from '../../../serveur/baseUrl'
import getLoaderActions from '../../../redux/wrapApi/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* syncUserSagas() {
    try {
        yield put(getLoaderActions.activeGeneraleLoader())
        const res = yield axios({
            method: 'get',
            url: `${baseUrl}users/get/syncronisationCrm`,
            headers: {
                'Accept-Version': 1,
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
            },
            timeout: 10000,
        })
        if (res.status === 200) {
            yield all([
                yield put(getAllUsersActions.getAllUsersRequest()),
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: 'Synchronisation avec succes',
                    })
                ),
                yield put(getLoaderActions.disableGeneraleLoader()),
            ])
        } else {
            yield put(getLoaderActions.disableGeneraleLoader())
        }
    } catch (error) {
        yield put(getLoaderActions.disableGeneraleLoader())
    }
}

/**
 * appele à la fonction with key action
 */
export default function* syncUserSaga() {
    yield takeLatest('SYNC_USERS', syncUserSagas)
}
