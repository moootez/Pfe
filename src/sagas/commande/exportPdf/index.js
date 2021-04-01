/* eslint-disable import/prefer-default-export */
import axios from 'axios'
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import exportPdfCommandeAction, {
    exportPdfCommandeTypes,
} from '../../../redux/commande/exportPdf'
import alertActions from '../../../redux/alert'
import baseUrl from '../../../serveur/baseUrl'
import getLoaderActions from '../../../redux/wrapApi/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* exportPdfCommandeSagas({ response }) {
    try {
        yield put(getLoaderActions.activeGeneraleLoader())
        const res = yield axios({
            method: 'post',
            url: `${baseUrl}commande/export`,
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
                    exportPdfCommandeAction.exportPdfCommandeSuccess(
                        res.data.data
                    )
                ),
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: 'Export commande avec succes',
                    })
                ),
                yield put(getLoaderActions.disableGeneraleLoader()),
            ])
        } else {
            yield put(
                exportPdfCommandeAction.exportPdfCommandeFailure(res.data.data)
            )
            yield put(getLoaderActions.disableGeneraleLoader())
        }
    } catch (error) {
        yield put(exportPdfCommandeAction.exportPdfCommandeFailure(error))
        yield put(getLoaderActions.disableGeneraleLoader())
    }
}

/**
 * appele à la fonction with key action
 */
export default function* exportPdfCommandeSaga() {
    yield takeLatest(
        exportPdfCommandeTypes.EXPORT_PDF_COMMANDE_REQUEST,
        exportPdfCommandeSagas
    )
}
