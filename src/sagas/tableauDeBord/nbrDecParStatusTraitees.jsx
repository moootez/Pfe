import { takeLatest, put, all } from 'redux-saga/effects'
import nbrDecParStatusTraiteesActions, {
    nbrDecParStatusTraiteesTypes,
} from '../../redux/tableauDeBord/nbrDecParStatusTraitees'
import { Post } from '../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* nbrDecParStatusTraiteesSagas() {
    try {
        const res = yield Post(`dashbord/list/compteur_status`)

        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    nbrDecParStatusTraiteesActions.nbrDecParStatusTraiteesSuccess(
                        res.data
                    )
                ),
            ])
        } else {
            yield put(
                nbrDecParStatusTraiteesActions.nbrDecParStatusTraiteesFailure(
                    res
                )
            )
        }
    } catch (error) {
        yield put(
            nbrDecParStatusTraiteesActions.nbrDecParStatusTraiteesFailure(error)
        )
    }
}

/**
 * appele à la fonction with key action
 */
export default function* nbrDecParStatusTraiteesSaga() {
    yield takeLatest(
        nbrDecParStatusTraiteesTypes.NBR_DEC_PAR_STATUS_TRAITEES_REQUEST,
        nbrDecParStatusTraiteesSagas
    )
}
