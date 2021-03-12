/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getFilterDeclarantInterneActions, {
    getFilterDeclarantInterneTypes,
} from '../../../redux/declarantInterne/getDeclarantInterne'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getFilterDeclarantInterneSagas({ response }) {
    try {
        const res = yield Post('declarant/bypage', response)
        if (res.status === 200) {
            yield all([
                yield put(
                    getFilterDeclarantInterneActions.getFilterDeclarantInterneSuccess(
                        res.data
                    )
                ),
            ])
        } else {
            yield put(
                getFilterDeclarantInterneActions.getFilterDeclarantInterneFailure(
                    res.data.data
                )
            )
        }
    } catch (error) {
        yield put(
            getFilterDeclarantInterneActions.getFilterDeclarantInterneFailure(
                error
            )
        )
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getFilterDeclarantInterneSaga() {
    yield takeLatest(
        getFilterDeclarantInterneTypes.GET_FILTER_DECLARANT_INTERNE_REQUEST,
        getFilterDeclarantInterneSagas
    )
}
