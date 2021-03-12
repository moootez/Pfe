/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import addEtablissementActions, {
    addEtablissementTypes,
} from '../../../redux/etablissement/addEtablissement'
// import getFilterEtablissementActions from '../../../redux/etablissement/getFiltreEtablissement'
import { Post } from '../../../serveur/axios'
import changeStepActions from '../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addEtablissementSagas({ response }) {
    try {
        const res = yield Post('etablissement/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    addEtablissementActions.addEtablissementSuccess(res.data)
                ),
                // yield put(
                //     getFilterEtablissementActions.getFilterEtablissementRequest()
                // ),
                yield put(changeStepActions.changeStepSaisie(2)),
                yield put(changeStepActions.changeStepDeclaration(0)),
            ])
        } else {
            yield put(addEtablissementActions.addEtablissementFailure(res.data))
        }
    } catch (error) {
        yield put(addEtablissementActions.addEtablissementFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* addEtablissementSaga() {
    yield takeLatest(
        addEtablissementTypes.ADD_ETABLISSEMENT_REQUEST,
        addEtablissementSagas
    )
}
