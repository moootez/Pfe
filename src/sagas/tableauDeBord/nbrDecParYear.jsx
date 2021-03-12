import { takeLatest, put, all } from 'redux-saga/effects'
import nbrDecParYearActions, {
    nbrDecParYearTypes,
} from '../../redux/tableauDeBord/nbrDecParYear'
import { Post } from '../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* nbrDecParYearSagas({ response }) {
    console.log('response', response)
    try {
        const res = yield Post(
            `dashbord/list/compteur_status_traitees`,
            response
        )
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(nbrDecParYearActions.nbrDecParYearSuccess(res.data)),
            ])
        } else {
            yield put(nbrDecParYearActions.nbrDecParYearFailure(res))
        }
    } catch (error) {
        yield put(nbrDecParYearActions.nbrDecParYearFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* nbrDecParYearSaga() {
    yield takeLatest(
        nbrDecParYearTypes.NBR_DEC_PAR_YEAR_REQUEST,
        nbrDecParYearSagas
    )
}
