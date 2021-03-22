/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import { goBack } from 'connected-react-router'
import alertActions from '../../../redux/alert'
import submitDecActions, {
    submitDecTypes,
} from '../../../redux/declaration_grab/submitDecSaisie/index'
import { Post } from '../../../serveur/axios'
// import getFilterDeclarationsActions from '../../../redux/declaration_grab/getfilterDeclaration/getFilterDeclarations'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* submitDecSagas({ response }) {
    try {
        const res = yield Post(
            `declaration/change-status/${response.id_declaration}`,
            response.body
        )
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(submitDecActions.submitDecSuccess(res.data)),
                // open popup de success
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: 'Modifier avec succès ',
                    })
                ),
                // yield put(
                //     getFilterDeclarationsActions.getFilterDeclarationsRequest({
                //         status: 'en attente de saisie',
                //     })
                // ),
                // yield put(goBack()),
            ])
        } else {
            yield put(submitDecActions.submitDecFailure(res.data))
        }
        if (res.data) {
            const { history } = response
            const pathname = window.location.pathname.split('/')
            console.log(
                'pathname',
                pathname[1],
                pathname[1] === 'declaration_saisie'
            )
            if (
                pathname[1] === 'declaration_saisie' ||
                pathname[1] === 'cour_des_comptes'
            )
                yield put(goBack())
            else history.push(`/${pathname[1]}`)
        }
    } catch (error) {
        yield put(submitDecActions.submitDecFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* submitDecSaga() {
    yield takeLatest(submitDecTypes.SUBMIT_DEC_REQUEST, submitDecSagas)
}
