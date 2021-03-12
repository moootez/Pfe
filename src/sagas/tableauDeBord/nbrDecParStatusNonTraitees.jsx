import { takeLatest, put, all } from 'redux-saga/effects'
import nbrDecParStatusNonTraiteesActions, {
    nbrDecParStatusNonTraiteesTypes,
} from '../../redux/tableauDeBord/nbrDecParStatusNonTraitees'
import { Post } from '../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* nbrDecParStatusNonTraiteesSagas() {
    try {
        const res = yield Post(`dashbord/list/compteur_status_non_traitees`)

        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    nbrDecParStatusNonTraiteesActions.nbrDecParStatusNonTraiteesSuccess(
                        res.data
                    )
                ),
            ])
        } else {
            yield put(
                nbrDecParStatusNonTraiteesActions.nbrDecParStatusNonTraiteesFailure(
                    res
                )
            )
        }
    } catch (error) {
        yield put(
            nbrDecParStatusNonTraiteesActions.nbrDecParStatusNonTraiteesFailure(
                error
            )
        )
    }
}

/**
 * appele à la fonction with key action
 */
export default function* nbrDecParStatusNonTraiteesSaga() {
    yield takeLatest(
        nbrDecParStatusNonTraiteesTypes.NBR_DEC_PAR_STATUS_NON_TRAITEES_REQUEST,
        nbrDecParStatusNonTraiteesSagas
    )
}
