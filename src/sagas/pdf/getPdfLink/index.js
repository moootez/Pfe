/* eslint-disable import/prefer-default-export */
import { takeLatest, put, call, all } from 'redux-saga/effects' // eslint-disable-line
import getPdfLinkActions, {
    getPdfLinkTypes,
} from '../../../redux/pdf/getPdfLink'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getPdfLinkSagas({ response }) {
    try {
        let responseAdd = {}
        if (response.email)
            responseAdd = yield Post('users/export_pdf', response)
        else responseAdd = yield Post('demande/export_pdf', response)
        if (responseAdd.status === 200 || responseAdd.status === 201) {
            window.open(`http://${responseAdd.data.result}`, '_blank')

            // yield all([
            //     yield put(
            //         getPdfLinkActions.getPdfLinkSuccess(responseAdd.data)
            //     ),
            // ])
        } else {
            yield put(getPdfLinkActions.getPdfLinkFailure(responseAdd.data))
        }
    } catch (error) {
        yield put(getPdfLinkActions.getPdfLinkFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getPdfLinkSaga() {
    yield takeLatest(getPdfLinkTypes.GET_PDF_LINK_REQUEST, getPdfLinkSagas)
}
