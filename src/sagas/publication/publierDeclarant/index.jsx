import { takeLatest, put, all } from 'redux-saga/effects'
import alertActions from '../../../redux/alert'
import publierDeclarantActions, {
    publierDeclarantTypes,
} from '../../../redux/publication/publierDeclarant'
// import getFilterDeclarantActions from '../../../redux/declaration_grab/getfilterDeclaration/getFilterDeclarant'
import { Patch } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* publierDeclarantSagas({ response }) {
    try {
        const res = yield Patch('users/users/published', response)
        if (res.status === 204 || res.status === 201) {
            yield all([
                yield put(
                    publierDeclarantActions.publierDeclarantSuccess(res.data)
                ),
                // yield put(
                //     getFilterDeclarantActions.getFilterDeclarantRequest({})
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
            yield put(publierDeclarantActions.publierDeclarantFailure(res))
        }
    } catch (error) {
        yield put(publierDeclarantActions.publierDeclarantFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* publierDeclarantSaga() {
    yield takeLatest(
        publierDeclarantTypes.PUBLIER_DECLARANT_REQUEST,
        publierDeclarantSagas
    )
}
