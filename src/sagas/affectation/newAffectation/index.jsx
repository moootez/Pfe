import { takeLatest, put, all } from 'redux-saga/effects'
import alertActions from '../../../redux/alert'
import newAffectationActions, {
    newAffectationTypes,
} from '../../../redux/affectation/newAffectation'
// import getFilterDeclarationsForRapprochementActions from '../../../redux/declaration_grab/getfilterDeclaration/getFilterDecForRapprochement'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* newAffectationSagas({ response }) {
    try {
        const res = yield Post('affectation/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    newAffectationActions.newAffectationSuccess(res.data)
                ),
                // yield put(
                //     getFilterDeclarationsForRapprochementActions.getFilterDeclarationsForRapprochementRequest(
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
                        message: 'تم التعيين بنجاح',
                    })
                ),
            ])
        } else {
            yield put(newAffectationActions.newAffectationFailure(res))
        }
    } catch (error) {
        yield put(newAffectationActions.newAffectationFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* newAffectationSaga() {
    yield takeLatest(
        newAffectationTypes.NEW_AFFECTATION_REQUEST,
        newAffectationSagas
    )
}
