import { takeLatest, put, all } from 'redux-saga/effects'
import nbrDecParActionActions, {
    nbrDecParActionTypes,
} from '../../redux/tableauDeBord/nbrDecParAction'
import { Post } from '../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* nbrDecParActionSagas() {
    try {
        const res = yield Post(`dashbord/list/tableau_par_action`)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    nbrDecParActionActions.nbrDecParActionSuccess(res.data)
                ),
            ])
        } else {
            yield put(nbrDecParActionActions.nbrDecParActionFailure(res))
        }
    } catch (error) {
        yield put(nbrDecParActionActions.nbrDecParActionFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* nbrDecParActionSaga() {
    yield takeLatest(
        nbrDecParActionTypes.NBR_DEC_PAR_ACTION_REQUEST,
        nbrDecParActionSagas
    )
}
