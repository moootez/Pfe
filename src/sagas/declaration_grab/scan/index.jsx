/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import alertActions from '../../../redux/alert'
import scanDecActions, {
    scanDecTypes,
} from '../../../redux/declaration_grab/scan/index'
import { Post } from '../../../serveur/axios'
// import getFilterDeclarationsActions from '../../../redux/declaration_grab/getfilterDeclaration/getFilterDeclarations'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* scanDecSagas({ response }) {
    try {
        const res = yield Post(
            `declaration/document/${response.id_declaration}`,
            response.body
        )
        if (res.status === 201) {
            yield all([
                yield put(scanDecActions.scanDecSuccess(res.data)),
                // open popup de success
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: 'تمت التعيين للمصالحة بنجاح',
                    })
                ),
                // yield put(
                //     getFilterDeclarationsActions.getFilterDeclarationsRequest({
                //         status: 'saisie',
                //         rattache: true,
                //     })
                // ),
                // yield put(goBack()),
            ])
        } else {
            yield put(scanDecActions.scanDecFailure(res.data))
        }
        if (res.data)
            response.history.push({
                pathname:
                    '/declaration_rattacher_saisie/rattacher_le_scan_de_la_declaration',
            })
    } catch (error) {
        yield put(scanDecActions.scanDecFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* scanDecSaga() {
    yield takeLatest(scanDecTypes.SCAN_DEC_REQUEST, scanDecSagas)
}
