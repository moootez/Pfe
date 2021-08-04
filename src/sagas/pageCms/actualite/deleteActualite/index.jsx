import { takeLatest, put, all } from 'redux-saga/effects'
import alertActions from '../../../../redux/alert'
import deleteActualiteActions, {
    deleteActualiteTypes,
} from '../../../../redux/pageCms/actualite/deleteActualite'
import { Delete } from '../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* deleteActualiteSagas({ response }) {
    try {
        const res = yield Delete(`actualite/${response}`)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    deleteActualiteActions.deleteActualiteSuccess(res.data)
                ),
                // open popup de success
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: 'Supprimé avec succès',
                    })
                ),
            ])
        } else {
            yield put(deleteActualiteActions.deleteActualiteFailure(res))
        }
    } catch (error) {
        yield put(deleteActualiteActions.deleteActualiteFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* deleteActualiteSaga() {
    yield takeLatest(
        deleteActualiteTypes.DELETE_ACTUALITE_REQUEST,
        deleteActualiteSagas
    )
}
