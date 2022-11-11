/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import validerCommandeAction, {
    validerCommandeTypes,
} from '../../../redux/commande/validerCommande'
import getCommandeActions from '../../../redux/commande/getCommande'
import baseUrl from '../../../serveur/baseUrl'
import getLoaderActions from '../../../redux/wrapApi/index'
import alertActions from '../../../redux/alert'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
const BROUILLON = 'BROUILLON'
const VALIDATION_CLIENT = 'VALIDATION_CLIENT'
const VALIDATION = 'VALIDATION'

function* validerCommandeSagas({ response }) {
    try {
        const { commande, status, user, role } = response
        yield put(getLoaderActions.activeGeneraleLoader())
        const { OpaliaToken } = window.localStorage

        const res = yield axios({
            method: 'post',
            url: `${baseUrl}commande/change-status/${commande}`,
            headers: {
                'Accept-Version': 1,
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${OpaliaToken}`
            },
            timeout: 10000,
            data: { status },
        })
        if (res.status === 200 || res.status === 201) {
            let x = ' '
            if (
                response.status === 'BROUILLON' ||
                response.status === 'ANNULER'
            ) {
                x = 'Commande annulée'
            } else if (
                response.status === 'VALIDATION_OPALIA' ||
                response.status === 'VALIDATION_CLIENT'
            ) {
                x = 'Commande validée'
            }
            // if (res.data.data.status === BROUILLON) {
            //     x = 'Commande annulée'
            // } else if (
            //     res.data.data.status === VALIDATION ||
            //     res.data.data.status === VALIDATION_CLIENT ||
            //     res.data.data === ''
            // ) {
            //     x = 'Commande validée'
            // }

            yield all([
                yield put(
                    validerCommandeAction.validerCommandeSuccess(res.data.data)
                ),
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: x,
                    })
                ),

                yield put(
                    getCommandeActions.getCommandeRequest({ user, role })
                ),
                yield put(getLoaderActions.disableGeneraleLoader()),
            ])
        } else {
            yield put(
                validerCommandeAction.validerCommandeFailure(res.data.data)
            )
            yield put(getLoaderActions.disableGeneraleLoader())
        }
    } catch (error) {
        yield put(validerCommandeAction.validerCommandeFailure(error))
        yield put(getLoaderActions.disableGeneraleLoader())
        yield put(
            alertActions.alertShow(true, {
                onConfirm: false,
                warning: true,
                info: false,
                error: false,
                success: false,
                message: 'Erreur',
            })
        )
    }
}

/**
 * appele à la fonction with key action
 */
export default function* validerCommandeSaga() {
    yield takeLatest(
        validerCommandeTypes.VALIDER_COMMANDE_REQUEST,
        validerCommandeSagas
    )
}
