import { takeLatest, put, all } from 'redux-saga/effects'
import getExportPdfActions, {
    getExportPdfTypes,
} from '../../../redux/declarantInterne/getExportPdf'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getExportPdfSagas({ response }) {
    try {
        const res = yield Post(
            `/assujettideclaration/export_file_pdf_AssujettiDeclarant`,
            response
        )
        if (res.status === 200 || res.status === 201) {
            window.open(res.data.result, '_blank')
            yield all([
                yield put(getExportPdfActions.getExportPdfSuccess(res.data)),
            ])
        } else {
            yield put(getExportPdfActions.getExportPdfFailure(res))
        }
    } catch (error) {
        yield put(getExportPdfActions.getExportPdfFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getExportPdfSaga() {
    yield takeLatest(
        getExportPdfTypes.GET_EXPORT_PDF_REQUEST,
        getExportPdfSagas
    )
}
