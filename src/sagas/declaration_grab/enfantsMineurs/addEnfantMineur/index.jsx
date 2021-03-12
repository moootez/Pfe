/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import addEnfantMineurDeclarationsActions, {
    addEnfantMineurDeclarationsTypes,
} from '../../../../redux/declaration_grab/enfantsMineurs/addEnfantMineur/index'
import getEnfantmieurActions from '../../../../redux/declaration_grab/enfantsMineurs/getEnfantMineur/index'
import { Post } from '../../../../serveur/axios'
import changeStepActions from '../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addEnfantMineurDeclarationsSagas({ response }) {
    try {
        const res = yield Post('enfant/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    addEnfantMineurDeclarationsActions.addEnfantMineurDeclarationsSuccess(
                        res.data
                    )
                ),
                yield put(
                    getEnfantmieurActions.getEnfantRequest(
                        response[0].declarant
                    )
                ),
                yield put(changeStepActions.changeStepSaisie(2)),
                yield put(changeStepActions.changeStepDeclaration(0)),
            ])
        } else {
            yield put(
                addEnfantMineurDeclarationsActions.addEnfantMineurDeclarationsFailure(
                    res.data
                )
            )
        }
    } catch (error) {
        yield put(
            addEnfantMineurDeclarationsActions.addEnfantMineurDeclarationsFailure(
                error
            )
        )
    }
}

/**
 * appele à la fonction with key action
 */
export function* addEnfantMineurDeclarationsSaga() {
    yield takeLatest(
        addEnfantMineurDeclarationsTypes.ADD_ENFANT_MINEUR_DECLARATIONS_REQUEST,
        addEnfantMineurDeclarationsSagas
    )
}
