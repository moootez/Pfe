/* eslint-disable import/prefer-default-export */
import axios from 'axios'
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import addNewCommandeAction, {
    addNewCommandeTypes,
} from '../../../redux/commande/newCommande'
import alertActions from '../../../redux/alert'
import baseUrl from '../../../serveur/baseUrl'
import getLoaderActions from '../../../redux/wrapApi/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addNewCommandeSagas({ response }) {
    console.log('ata', response)
    try {
        yield put(getLoaderActions.activeGeneraleLoader())
        const { OpaliaToken } = window.localStorage

        const res = yield axios({
            method: 'post',
            url: `${baseUrl}commande/new`,
            headers: {
                'Accept-Version': 1,
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${OpaliaToken}`
            },
            timeout: 8000,
            data: response,
        })
        if (res.status === 200) {
            yield all([
                yield put(
                    addNewCommandeAction.addNewCommandeSuccess(res.data.data)
                ),
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: 'Ajout commande avec succes',
                    })
                ),
                yield put(getLoaderActions.disableGeneraleLoader()),
            ])
        } else {
            yield put(addNewCommandeAction.addNewCommandeFailure(res.data.data))
            yield put(getLoaderActions.disableGeneraleLoader())
        }
    } catch (error) {
        yield put(addNewCommandeAction.addNewCommandeFailure(error))
        yield put(getLoaderActions.disableGeneraleLoader())
    }
}

/**
 * appele à la fonction with key action
 */
export default function* addNewCommandeSaga() {
    yield takeLatest(
        addNewCommandeTypes.ADD_NEW_COMMANDE_REQUEST,
        addNewCommandeSagas
    )
}
