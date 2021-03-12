/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getRapportByRubriqueActions, {
    getRapportByRubriqueTypes,
} from '../../../redux/rapport/getRapportByRubrique/index'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getRapportByRubriqueSagas({ response }) {
    try {
        const res = yield Post('rapport/rapport-with-data', response)
        if (res.status === 200) {
            yield put(
                getRapportByRubriqueActions.getRapportByRubriqueSuccess(
                    res.data
                )
            )
        } else {
            yield put(
                getRapportByRubriqueActions.getRapportByRubriqueFailure(
                    res.data
                )
            )
        }
    } catch (error) {
        yield put(
            getRapportByRubriqueActions.getRapportByRubriqueFailure(error)
        )
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getRapportByRubriqueSaga() {
    yield takeLatest(
        getRapportByRubriqueTypes.GET_RAPPORT_BY_RUBRIQUE_REQUEST,
        getRapportByRubriqueSagas
    )
}
