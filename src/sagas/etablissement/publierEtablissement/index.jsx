/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import alertActions from '../../../redux/alert'
import publierEtablissementActions, {
    publierEtablissementTypes,
} from '../../../redux/etablissement/publierEtablissement'
// import getFilterEtablissementActions from '../../../redux/etablissement/getFiltreEtablissement'
import { Patch } from '../../../serveur/axios'
import changeStepActions from '../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* publierEtablissementSagas({ response }) {
    try {
        const res = yield Patch('etablissement/published', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    publierEtablissementActions.publierEtablissementSuccess(
                        res.data
                    )
                ),
                // open popup de success
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: 'تم النشر بنجاح',
                    })
                ),
                // yield put(
                //     getFilterEtablissementActions.getFilterEtablissementRequest()
                // ),
                yield put(changeStepActions.changeStepSaisie(2)),
                yield put(changeStepActions.changeStepDeclaration(0)),
            ])
        } else {
            yield put(
                publierEtablissementActions.publierEtablissementFailure(
                    res.data
                )
            )
        }
    } catch (error) {
        yield put(
            publierEtablissementActions.publierEtablissementFailure(error)
        )
    }
}

/**
 * appele à la fonction with key action
 */
export function* publierEtablissementSaga() {
    yield takeLatest(
        publierEtablissementTypes.PUBLIER_ETABLISSEMENT_REQUEST,
        publierEtablissementSagas
    )
}
