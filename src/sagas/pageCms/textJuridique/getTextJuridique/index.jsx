import { takeLatest, put, all } from 'redux-saga/effects'
import getTextJuridiqueActions, {
    getTextJuridiqueTypes,
} from '../../../../redux/pageCms/textJuridique/getTextJuridique'
import { Get } from '../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 */
function* getTextJuridiqueSagas() {
    try {
        const res = yield Get(`textejuridique/all`)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    getTextJuridiqueActions.getTextJuridiqueSuccess(res.data)
                ),
            ])
        } else {
            yield put(getTextJuridiqueActions.getTextJuridiqueFailure(res))
        }
    } catch (error) {
        yield put(getTextJuridiqueActions.getTextJuridiqueFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getTextJuridiqueSaga() {
    yield takeLatest(
        getTextJuridiqueTypes.GET_TEXT_JURIDIQUE_REQUEST,
        getTextJuridiqueSagas
    )
}
