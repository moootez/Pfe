import { takeLatest, put } from 'redux-saga/effects'
import getInfoActions, { getInfoTypes } from '../../../redux/certificat/getInfo'
import { Get } from '../../../serveur/axiosForSigniature'
// import alertActions from '../../../redux/alert'

/**
 * consomation API avec axios
 *
 */
function* getInfoSagas() {
    try {
        // vérification de l'instalation du token
        const res = yield Get('http://localhost:9026/inlucc/auth/infos')

        if (res.status === 200 || res.status === 201)
            yield put(getInfoActions.getInfoSuccess(res.data))
        else yield put(getInfoActions.getInfoFailure(res))
    } catch (error) {
        console.log('error', error)

        yield put(getInfoActions.getInfoFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getInfoSaga() {
    yield takeLatest(getInfoTypes.GET_INFO_REQUEST, getInfoSagas)
}
