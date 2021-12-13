/* eslint-disable import/prefer-default-export */
import axios from 'axios'
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import updateReclamationAction, {
    updateReclamationTypes,
} from '../../../redux/reclamation/updateReclamation'
import alertActions from '../../../redux/alert'
import baseUrl from '../../../serveur/baseUrl'
import getLoaderActions from '../../../redux/wrapApi/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* updateReclamationSagas({ response }) {
    const { reclamation } = response
    try {
        yield put(getLoaderActions.activeGeneraleLoader())
        const res = yield axios({
            method: 'post',
            url: `${baseUrl}reclamation/change-status/${reclamation}`,
            headers: {
                'Accept-Version': 1,
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
            },
            timeout: 3000,
            data: response,
        })
        console.log(res, 'res')
        const message = `Réclamation ${res.data.data.status} avec succès`
        const message2 = `Réclamation ${res.data.data.status}`
        console.log(message, 'message')
        console.log(message2, 'message2')
        console.log(res.data.data.status, 'statut')
        if (
            res.data.data.status === 'Acceptée' ||
            res.data.data.status === 'Reçue'
        ) {
            yield all([
                yield put(
                    updateReclamationAction.updateReclamationSuccess(
                        res.data.data
                    )
                ),
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: [message],
                    })
                ),
                yield put(getLoaderActions.disableGeneraleLoader()),
            ])
        }

        if (
            res.data.data.status === 'En cours' ||
            res.data.data.status === 'Refusée'
        ) {
            yield all([
                yield put(
                    updateReclamationAction.updateReclamationSuccess(
                        res.data.data
                    )
                ),
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: [message2],
                    })
                ),
                yield put(getLoaderActions.disableGeneraleLoader()),
            ])
        } else {
            yield put(
                updateReclamationAction.updateReclamationFailure(res.data.data)
            )
            yield put(getLoaderActions.disableGeneraleLoader())
        }
    } catch (error) {
        yield put(updateReclamationAction.updateReclamationFailure(error))
        yield put(getLoaderActions.disableGeneraleLoader())
    }
}

/**
 * appele à la fonction with key action
 */
export default function* updateReclamationSaga() {
    yield takeLatest(
        updateReclamationTypes.UPDATE_RECLAMATION_REQUEST,
        updateReclamationSagas
    )
}
