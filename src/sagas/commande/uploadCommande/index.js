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
        const res = yield axios({
            method: 'post',
            url: `${baseUrl}commande/import`,
            headers: {
                'Accept-Version': 1,
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
            },
            timeout: 3000,
            data: response,
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
                        message: 'Ajout commande avec succes',
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
