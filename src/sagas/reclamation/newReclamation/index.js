/* eslint-disable import/prefer-default-export */
import axios from 'axios'
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import addNewReclamationAction, {
    addNewReclamationTypes,
} from '../../../redux/reclamation/newReclamation'
import alertActions from '../../../redux/alert'
import baseUrl from '../../../serveur/baseUrl'
import getLoaderActions from '../../../redux/wrapApi/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addNewReclamationSagas({ response }) {
    try {
        yield put(getLoaderActions.activeGeneraleLoader())
        const res = yield axios({
            method: 'post',
            url: `${baseUrl}reclamation/new`,
            headers: {
                'Accept-Version': 1,
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
            },
            timeout: 10000,
            data: response,
        })
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    addNewReclamationAction.addNewReclamationSuccess(
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
                        message: 'Ajout réclamation avec succès',
                    })
                ),
                yield put(getLoaderActions.disableGeneraleLoader()),
            ])
        } else {
            yield put(
                addNewReclamationAction.addNewReclamationFailure(res.data.data)
            )
            yield put(getLoaderActions.disableGeneraleLoader())
        }
    } catch (error) {
        yield put(addNewReclamationAction.addNewReclamationFailure(error))
        yield put(getLoaderActions.disableGeneraleLoader())
    }
}

/**
 * appele à la fonction with key action
 */
export default function* addNewReclamationSaga() {
    yield takeLatest(
        addNewReclamationTypes.ADD_NEW_RECLAMATION_REQUEST,
        addNewReclamationSagas
    )
}
