import { takeLatest, put, all } from 'redux-saga/effects'
import nbrInscEnAttenteActions, {
    nbrInscEnAttenteTypes,
} from '../../redux/tableauDeBord/nbrInscEnAttente'
import { Post } from '../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* nbrInscEnAttenteSagas() {
    try {
        const res = yield Post(
            `dashbord/list/nbr_inscription_attente_validation`
        )
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    nbrInscEnAttenteActions.nbrInscEnAttenteSuccess(res.data)
                ),
            ])
        } else {
            yield put(nbrInscEnAttenteActions.nbrInscEnAttenteFailure(res))
        }
    } catch (error) {
        yield put(nbrInscEnAttenteActions.nbrInscEnAttenteFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* nbrInscEnAttenteSaga() {
    yield takeLatest(
        nbrInscEnAttenteTypes.NBR_INSC_EN_ATTENTE_REQUEST,
        nbrInscEnAttenteSagas
    )
}
