import { takeLatest, put, all } from 'redux-saga/effects'
import addDeclarantActions, {
    addDeclarantTypes,
} from '../../../redux/declaration/addDeclarant'
import alertActions from '../../../redux/alert'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addDeclarantSagas({ response }) {
    try {
        const res = yield Post('declaration/declarant/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addDeclarantActions.addDeclarantSuccess(res.data)),
            ])
            if (res.data.preview === 'true') {
                // open popup de success
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message:
                            response.language === 'ar'
                                ? 'تتم إضافة المصرح. سوف تتلقى معرفاتك عن طريق البريد الإلكتروني في غضون 72 ساعة'
                                : 'Votre inscription est en cours de traitement. Vous receverez vos identifiants par mail dans les 72 heures',
                        title: response.language === 'ar' ? 'تم' : 'Succés',
                    })
                )
            }
        } else {
            yield put(addDeclarantActions.addDeclarantFailure(res))
        }
    } catch (error) {
        yield put(addDeclarantActions.addDeclarantFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* addDeclarantSaga() {
    yield takeLatest(addDeclarantTypes.ADD_DECLARANT_REQUEST, addDeclarantSagas)
}
