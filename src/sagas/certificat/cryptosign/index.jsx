import { takeLatest, put } from 'redux-saga/effects'
import cryptosignActions, {
    cryptosignTypes,
} from '../../../redux/certificat/cryptosign'
import { Post } from '../../../serveur/axiosForSigniature'
// import alertActions from '../../../redux/alert'
import validerCertifActions from '../../../redux/certificat/validerCertif'
import alertActions from '../../../redux/alert'
import loginActions from '../../../redux/login'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* cryptosignSagas({ response }) {
    try {
        const res = yield Post('http://localhost:9026/inlucc/auth/cryptosign', {
            data: response.data,
            alias: response.alias,
        })
        if (res.status === 200 || res.status === 201) {
            yield put(cryptosignActions.cryptosignSuccess(res.data))
            const payload = { data: res.data.cryptoSign, type: 'XML' }
            const validate = yield Post(
                'http://51.255.39.14:9027/inlucc/signature/validate',
                payload
            )
            if (validate.status === 200 || validate.status === 201) {
                yield put(
                    validerCertifActions.validerCertifSuccess(validate.data)
                )
                // open popup de success
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: 'تم التوقيع بنجاح',
                    })
                )
                yield put(
                    loginActions.loginRequest({
                        password: response.data,
                        email: response.email,
                        serialNumberToken:
                            validate.response.certificateInfo.serialNumber,
                    })
                )
            } else
                yield put(validerCertifActions.validerCertifFailure(validate))
        } else yield put(cryptosignActions.cryptosignFailure(res))
    } catch (error) {
        yield put(cryptosignActions.cryptosignFailure(error))
        yield put(validerCertifActions.validerCertifFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* cryptosignSaga() {
    yield takeLatest(cryptosignTypes.CRYPTOSIGN_REQUEST, cryptosignSagas)
}
