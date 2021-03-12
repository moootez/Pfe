import { takeLatest, put, all } from 'redux-saga/effects'
import { goBack } from 'react-router-redux'
import addDeclarationCoursDesComptesActions, {
    addDeclarationCoursDesComptesTypes,
} from '../../../redux/declaration/addDeclarationCoursDesComptes'
import { Post } from '../../../serveur/axios'
import getReceivedActions from '../../../redux/declaration/getReceived'
// import alertActions from '../../../redux/alert'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addDeclarationCoursDesComptesSagas({ response }) {
    try {
        const res = yield Post('/cour_des_comptes/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    addDeclarationCoursDesComptesActions.addDeclarationCoursDesComptesSuccess(
                        res.data
                    )
                ),
                yield put(
                    getReceivedActions.getReceivedRequest(
                        res.data.data.declaration.id
                    )
                ),
                yield put(goBack()),
            ])
        } else {
            yield put(
                addDeclarationCoursDesComptesActions.addDeclarationCoursDesComptesFailure(
                    res
                )
            )
        }
    } catch (error) {
        yield put(
            addDeclarationCoursDesComptesActions.addDeclarationCoursDesComptesFailure(
                error
            )
        )
    }
}

/**
 * appele à la fonction with key action
 */
export default function* addDeclarationCoursDesComptesSaga() {
    yield takeLatest(
        addDeclarationCoursDesComptesTypes.ADD_DECLARATION_COURS_DES_COMPTES_REQUEST,
        addDeclarationCoursDesComptesSagas
    )
}
