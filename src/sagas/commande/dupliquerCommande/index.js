/* eslint-disable import/prefer-default-export */
import axios from 'axios'
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import dupliquerCommandeAction, {
    dupliquerCommandeTypes,
} from '../../../redux/commande/dupliquerCommande'
import alertActions from '../../../redux/alert'
import baseUrl from '../../../serveur/baseUrl'
import getLoaderActions from '../../../redux/wrapApi/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* dupliquerCommandeSagas({ response }) {
    try {
        const { OpaliaToken } = window.localStorage

        yield put(getLoaderActions.activeGeneraleLoader())
        const res = yield axios.post(`${baseUrl}commande/dupliquer`, response, {
            headers: {
                'Accept-Version': 1,
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${OpaliaToken}`,
            },
            timeout: 8000,
        })
        if (res.status === 200) {
            yield all([
                yield put(
                    dupliquerCommandeAction.dupliquerCommandeSuccess(
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
                        message: 'Commande dupliquée avec succes',
                    })
                ),
                yield put(getLoaderActions.disableGeneraleLoader()),
            ])
        } else {
            yield put(
                dupliquerCommandeAction.dupliquerCommandeFailure(res.data.data)
            )
            yield put(getLoaderActions.disableGeneraleLoader())
        }
    } catch (error) {
        yield put(dupliquerCommandeAction.dupliquerCommandeFailure(error))
        yield put(getLoaderActions.disableGeneraleLoader())
    }
}

/**
 * appele à la fonction with key action
 */
export default function* dupliquerCommandeSaga() {
    yield takeLatest(
        dupliquerCommandeTypes.DUPLIQUER_COMMANDE_REQUEST,
        dupliquerCommandeSagas
    )
}
