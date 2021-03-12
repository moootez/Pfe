/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getFontsActions, {
    getFontsTypes,
} from '../../../../../redux/declaration_grab/bien/fonts/getFonts/index'
import { Get } from '../../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getFontsSagas({ response }) {
    try {
        const res = yield Get(`stocktrade/${response}`)
        if (res.status === 200) {
            yield put(getFontsActions.getFontsSuccess(res.data))
        } else {
            yield put(getFontsActions.getFontsFailure(res.data))
        }
    } catch (error) {
        yield put(getFontsActions.getFontsFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getFontsSaga() {
    yield takeLatest(getFontsTypes.GET_FONTS_REQUEST, getFontsSagas)
}
