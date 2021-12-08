import { takeLatest, put, all } from 'redux-saga/effects'
import { goBack } from 'react-router-redux'
import alertActions from '../../../../redux/alert'
import editActualiteActions, {
    editActualiteTypes,
} from '../../../../redux/pageCms/actualite/editActualite'
import { Patch } from '../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* editActualiteSagas({ response }) {
    try {
        const res = yield Patch(`actualite/edit/${response.id}`, response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(editActualiteActions.editActualiteSuccess(res.data)),
                // open popup de success
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: 'Actualité modifiée avec succès !',
                    })
                ),
                yield put(goBack()),
            ])
        } else {
            yield put(editActualiteActions.editActualiteFailure(res))
        }
    } catch (error) {
        yield put(editActualiteActions.editActualiteFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* editActualiteSaga() {
    yield takeLatest(
        editActualiteTypes.EDIT_ACTUALITE_REQUEST,
        editActualiteSagas
    )
}
