import { takeLatest, put, all } from 'redux-saga/effects'
import { goBack } from 'react-router-redux'
import alertActions from '../../../../redux/alert'
import addActualiteActions, {
    addActualiteTypes,
} from '../../../../redux/pageCms/actualite/addActualite'
import { Post } from '../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addActualiteSagas({ response }) {
    try {
        const res = yield Post(`actualite/new`, response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addActualiteActions.addActualiteSuccess(res.data)),
                // open popup de success
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: ' Actualité ajoutée avec succès ',
                    })
                ),
                yield put(goBack()),
            ])
        } else {
            yield put(addActualiteActions.addActualiteFailure(res))
        }
    } catch (error) {
        yield put(addActualiteActions.addActualiteFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* addActualiteSaga() {
    yield takeLatest(addActualiteTypes.ADD_ACTUALITE_REQUEST, addActualiteSagas)
}
