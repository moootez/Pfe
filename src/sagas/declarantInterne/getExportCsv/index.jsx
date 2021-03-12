import { takeLatest, put, all } from 'redux-saga/effects'
import getExportCsvActions, {
    getExportCsvTypes,
} from '../../../redux/declarantInterne/getExportCsv'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getExportCsvSagas({ response }) {
    try {
        const res = yield Post(
            `/assujettideclaration/export_file_csv_AssujettiDeclarant`,
            response
        )
        if (res.status === 200 || res.status === 201) {
            window.open(res.data.result, '_blank')
            yield all([
                yield put(getExportCsvActions.getExportCsvSuccess(res.data)),
            ])
        } else {
            yield put(getExportCsvActions.getExportCsvFailure(res))
        }
    } catch (error) {
        yield put(getExportCsvActions.getExportCsvFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getExportCsvSaga() {
    yield takeLatest(
        getExportCsvTypes.GET_EXPORT_CSV_REQUEST,
        getExportCsvSagas
    )
}
