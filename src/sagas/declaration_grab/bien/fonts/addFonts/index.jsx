/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import addFontsActions, {
    addFontsTypes,
} from '../../../../../redux/declaration_grab/bien/fonts/addFonts/index'
import getFontsActions from '../../../../../redux/declaration_grab/bien/fonts/getFonts/index'
import { Post } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addFontsSagas({ response }) {
    try {
        const res = yield Post('stocktrade/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addFontsActions.addFontsSuccess(res.data)),
                yield put(
                    getFontsActions.getFontsRequest(response[0].declaration)
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(7)
                ),
            ])
        } else {
            yield put(addFontsActions.addFontsFailure(res.data))
        }
    } catch (error) {
        yield put(addFontsActions.addFontsFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* addFontsSaga() {
    yield takeLatest(addFontsTypes.ADD_FONTS_REQUEST, addFontsSagas)
}
