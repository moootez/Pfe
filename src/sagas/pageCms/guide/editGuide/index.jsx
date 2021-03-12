import { takeLatest, put, all } from 'redux-saga/effects'
import { goBack } from 'react-router-redux'
import alertActions from '../../../../redux/alert'
import editGuideActions, {
    editGuideTypes,
} from '../../../../redux/pageCms/guide/editGuide'
import { Patch } from '../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* editGuideSagas({ response }) {
    try {
        const res = yield Patch(`guide/edit/${response.id}`, response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(editGuideActions.editGuideSuccess(res.data)),
                // open popup de success
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: 'تم التعديل  بنجاح',
                    })
                ),
                yield put(goBack()),
            ])
        } else {
            yield put(editGuideActions.editGuideFailure(res))
        }
    } catch (error) {
        yield put(editGuideActions.editGuideFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* editGuideSaga() {
    yield takeLatest(editGuideTypes.EDIT_GUIDE_REQUEST, editGuideSagas)
}
