/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import isExistMatriculeActions, {
    isExistMatriculeTypes,
} from '../../../../../redux/declaration_grab/bien/vehicules/isExistMatricule'
import { Post } from '../../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* isExistMatriculeSagas({ response }) {
    if (response)
        try {
            const responseGet = yield Post(
                'vehicule/verify-immatriculation',
                response
            )
            if (responseGet.status === 200 || responseGet.status === 201) {
                yield all([
                    yield put(
                        isExistMatriculeActions.isExistMatriculeSuccess(
                            responseGet.data
                        )
                    ),
                ])
            } else {
                yield put(
                    isExistMatriculeActions.isExistMatriculeFailure(
                        responseGet.data
                    )
                )
            }
        } catch (error) {
            yield put(isExistMatriculeActions.isExistMatriculeFailure(error))
        }
}

/**
 * appele à la fonction with key action
 */
export function* isExistMatriculeSaga() {
    yield takeLatest(
        isExistMatriculeTypes.IS_EXIST_MATRICULE_REQUEST,
        isExistMatriculeSagas
    )
}
