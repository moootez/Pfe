/* eslint-disable import/prefer-default-export */
import axios from 'axios'
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import uploadCommandeAction, {
    uploadCommandeTypes,
} from '../../../redux/commande/uploadCommande'
import alertActions from '../../../redux/alert'
import baseUrl from '../../../serveur/baseUrl'
import getLoaderActions from '../../../redux/wrapApi/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* uploadCommandeSagas({ response }) {
    try {
        yield put(getLoaderActions.activeGeneraleLoader())
        const res = yield axios.post(`${baseUrl}commande/import`, response, {
            headers: {
                'Accept-Version': 1,
                'Access-Control-Allow-Origin': '*',
            },
            timeout: 8000,
        })
        if (res.status === 200) {
            yield all([
                yield put(
                    uploadCommandeAction.uploadCommandeSuccess(res.data.data)
                ),
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: 'Import commande avec succes',
                    })
                ),
                yield put(getLoaderActions.disableGeneraleLoader()),
            ])
        } else {
            yield put(uploadCommandeAction.uploadCommandeFailure(res.data.data))
            yield put(getLoaderActions.disableGeneraleLoader())
        }
    } catch (error) {
        yield put(uploadCommandeAction.uploadCommandeFailure(error))
        yield put(getLoaderActions.disableGeneraleLoader())
    }
}

/**
 * appele à la fonction with key action
 */
export default function* uploadCommandeSaga() {
    yield takeLatest(
        uploadCommandeTypes.UPLOAD_COMMANDE_REQUEST,
        uploadCommandeSagas
    )
}
