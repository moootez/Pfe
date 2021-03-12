import { takeLatest, put, all } from 'redux-saga/effects'
import getExportExcelActions, {
    getExportExcelTypes,
} from '../../../redux/declarantInterne/getExportExcel'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getExportExcelSagas({ response }) {
    try {
        const res = yield Post(
            `/assujettideclaration/export_file_excel_AssujettiDeclarant`,
            response
        )
        if (res.status === 200 || res.status === 201) {
            window.open(res.data.result, '_blank')
            yield all([
                yield put(
                    getExportExcelActions.getExportExcelSuccess(res.data)
                ),
            ])
        } else {
            yield put(getExportExcelActions.getExportExcelFailure(res))
        }
    } catch (error) {
        yield put(getExportExcelActions.getExportExcelFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getExportExcelSaga() {
    yield takeLatest(
        getExportExcelTypes.GET_EXPORT_EXCEL_REQUEST,
        getExportExcelSagas
    )
}
