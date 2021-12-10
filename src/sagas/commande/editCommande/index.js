/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-destructuring */

import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import { goBack } from 'react-router-redux'
import alertActions from '../../../redux/alert'
import editCommandeAction, {
    editCommandeTypes,
} from '../../../redux/commande/editCommande'
import baseUrl from '../../../serveur/baseUrl'
import { Patch } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* editCommandeSagas({ response }) {
    try {
        const { id } = response
        delete response.id
        // const result = Object.entries(response)

        // result.forEach(element => {
        //     tab.push = element
        // });

        const res = yield Patch(`${baseUrl}commande/${id}`, { data: response })
        if (res.status === 201) {
            yield all([
                yield put(editCommandeAction.editCommandeSuccess(response)),
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: 'Commande modifié avec succès',
                    })
                ),
                yield put(goBack()),
            ])
        } else {
            yield put(editCommandeAction.getCommandeFailure(response))
        }
    } catch (error) {
        yield put(editCommandeAction.getCommandeFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* editCommandeSaga() {
    yield takeLatest(editCommandeTypes.EDIT_COMMANDE_REQUEST, editCommandeSagas)
}
