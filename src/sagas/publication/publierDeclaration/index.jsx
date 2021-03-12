import { takeLatest, put, all } from 'redux-saga/effects'
import alertActions from '../../../redux/alert'
import publierDeclarationActions, {
    publierDeclarationTypes,
} from '../../../redux/publication/publierDeclaration'
// import getFilterDeclarationForPublicationActions from '../../../redux/declaration_grab/getfilterDeclaration/getFilterDecForPublication'
import { Patch } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* publierDeclarationSagas({ response }) {
    try {
        const res = yield Patch('declaration/published', response)
        if (res.status === 204 || res.status === 201) {
            yield all([
                yield put(
                    publierDeclarationActions.publierDeclarationSuccess(
                        res.data
                    )
                ),
                // yield put(
                //     getFilterDeclarationForPublicationActions.getFilterDeclarationsForPublicationRequest(
                //         {}
                //     )
                // ),
                // open popup de success
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: 'تم النشر بنجاح',
                    })
                ),
            ])
        } else {
            yield put(publierDeclarationActions.publierDeclarationFailure(res))
        }
    } catch (error) {
        yield put(publierDeclarationActions.publierDeclarationFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* publierDeclarationSaga() {
    yield takeLatest(
        publierDeclarationTypes.PUBLIER_DECLARATION_REQUEST,
        publierDeclarationSagas
    )
}
