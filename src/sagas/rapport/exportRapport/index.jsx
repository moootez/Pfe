/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import exportRapportActions, {
    exportRapportTypes,
} from '../../../redux/rapport/exportRapport/index'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* exportRapportSagas({ response }) {
    try {
        const res = yield Post(`rapport/downloadpdf/${response}`)
        if (res.status === 200 || res.status === 201) {
            window.open(res.data.result, '_blank')
            yield all([
                yield put(exportRapportActions.exportRapportSuccess(res.data)),
            ])
        } else {
            yield put(exportRapportActions.exportRapportFailure(res.data))
        }
    } catch (error) {
        yield put(exportRapportActions.exportRapportFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* exportRapportSaga() {
    yield takeLatest(
        exportRapportTypes.EXPORT_RAPPORT_REQUEST,
        exportRapportSagas
    )
}
