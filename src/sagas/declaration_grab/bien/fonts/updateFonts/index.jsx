/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import updateFontsActions, {
    updateFontsTypes,
} from '../../../../../redux/declaration_grab/bien/fonts/updateFonts/index'
import getFontsActions from '../../../../../redux/declaration_grab/bien/fonts/getFonts/index'
import { Patch } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* updateFontsSagas({ response }) {
    try {
        const responseEdit = yield Patch(
            `stocktrade/${response[0].declaration}`,
            response
        )
        if (
            responseEdit.status === 200 ||
            responseEdit.status === 201 ||
            responseEdit.status === 202
        ) {
            yield all([
                yield put(
                    updateFontsActions.updateFontsSuccess(responseEdit.data)
                ),
                yield put(
                    getFontsActions.getFontsRequest(response[0].declaration)
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(7)
                ),
            ])
        } else {
            yield put(updateFontsActions.updateFontsFailure(responseEdit.data))
        }
    } catch (error) {
        yield put(updateFontsActions.updateFontsFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* updateFontsSaga() {
    yield takeLatest(updateFontsTypes.UPDATE_FONTS_REQUEST, updateFontsSagas)
}
