import { takeLatest, put, all } from 'redux-saga/effects'
import { goBack } from 'react-router-redux'
import alertActions from '../../../../redux/alert'
import addTextJuridiqueActions, {
    addTextJuridiqueTypes,
} from '../../../../redux/pageCms/textJuridique/addTextJuridique'
import { Post } from '../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addTextJuridiqueSagas({ response }) {
    try {
        const res = yield Post(`textejuridique/new`, response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    addTextJuridiqueActions.addTextJuridiqueSuccess(res.data)
                ),
                // open popup de success
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: 'تم الإضافة  بنجاح',
                    })
                ),
                yield put(goBack()),
            ])
        } else {
            yield put(addTextJuridiqueActions.addTextJuridiqueFailure(res))
        }
    } catch (error) {
        yield put(addTextJuridiqueActions.addTextJuridiqueFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* addTextJuridiqueSaga() {
    yield takeLatest(
        addTextJuridiqueTypes.ADD_TEXT_JURIDIQUE_REQUEST,
        addTextJuridiqueSagas
    )
}
