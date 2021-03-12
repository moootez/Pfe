/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getResponsableRevenusActions, {
    getResponsableRevenusTypes,
} from '../../../../../redux/declaration_grab/bien/revenus/getResponsableRevenu'
import { Get } from '../../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getResponsableRevenusSagas({ response }) {
    try {
        const res = yield Get(`declaration/datas/${response}`)
        if (res.status === 200) {
            yield all([
                yield put(
                    getResponsableRevenusActions.getResponsableRevenusSuccess(
                        res.data
                    )
                ),
            ])
        } else {
            yield put(
                getResponsableRevenusActions.getResponsableRevenusFailure(
                    res.data
                )
            )
        }
    } catch (error) {
        yield put(
            getResponsableRevenusActions.getResponsableRevenusFailure(error)
        )
    }
}

/**
 * appele à la fonction with key action
 */
export function* getResponsableRevenusSaga() {
    yield takeLatest(
        getResponsableRevenusTypes.GET_RESPONSABLE_REVENUS_REQUEST,
        getResponsableRevenusSagas
    )
}
