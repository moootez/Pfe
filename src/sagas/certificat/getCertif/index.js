/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getCertifActions, {
    getCertifTypes,
} from '../../../redux/certificat/getCertif'
import { Get } from '../../../serveur/axiosForSigniature'
import alertActions from '../../../redux/alert'
import getInfoActions from '../../../redux/certificat/getInfo'

/**
 * consomation API avec axios
 *
 */
function* getCertifSagas() {
    try {
        const info = yield Get('http://localhost:9026/inlucc/auth/infos')
        if (info.status === 200) {
            yield put(getInfoActions.getInfoSuccess(info.data))
            const response = yield Get(
                'http://localhost:9026/inlucc/auth/certificates'
            )
            yield put(getCertifActions.getCertifSuccess(response.data))
        }
    } catch (error) {
        yield put(getInfoActions.getInfoFailure(error))
        yield put(getCertifActions.getCertifFailure(error))
        yield put(
            alertActions.alertShow(true, {
                onConfirm: false,
                warning: false,
                info: false,
                error: true,
                title: 'Erreur',
                success: false,
                message: "Erreur d'authentification serveur",
            })
        )
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getCertifSaga() {
    yield takeLatest(getCertifTypes.GET_CERTIF_REQUEST, getCertifSagas)
}
