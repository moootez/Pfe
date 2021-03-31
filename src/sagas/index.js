import { fork, all } from 'redux-saga/effects'
import { loginSaga } from './login/index'
import referencial from './referencial/index'
import { wrapApi } from './wrapApi/index'
import users from './user'
import affectation from './affectation'
import rapport from './rapport'
import declaration from './declaration'
import certificat from './certificat'
import declarationGrab from './declaration_grab'
import pdfs from './pdf'
import roles from './roles'
import publication from './publication'
import etablissement from './etablissement/index'
import declarantInterne from './declarantInterne'
import commande from './commande'
import inscription from './inscription'
import getStatistique from './statistique/index'
import parametres from './parametres/index'
import history from './history/index'
import pageCms from './pageCms/index'
import notification from './notification/index'
import tableauDeBord from './tableauDeBord/index'
import reclamation from './reclamation'

/**
 * configuration pour tous saga
 *
 * @param {*} pattern
 * @param {*} saga
 * @param {*} args
 */
// export const takeFirst = (pattern, saga, ...args) =>
//     fork(function* first() {
//         while (true) {
//         const action = yield take(pattern)
//         yield call(saga, ...args.concat(action))
//     }

//     })

const sagas = [
    ...tableauDeBord,
    loginSaga,
    wrapApi,
    ...reclamation,
    ...commande,
    ...history,
    ...referencial,
    ...users,
    ...pdfs,
    ...roles,
    ...affectation,
    ...declaration,
    ...certificat,
    ...rapport,
    ...declarationGrab,
    ...publication,
    ...etablissement,
    ...declarantInterne,
    ...inscription,
    ...getStatistique,
    ...parametres,
    ...pageCms,
    ...notification,
]

function* globalSagas() {
    const globalSagasForks = sagas.map(saga => fork(saga))
    yield all([...globalSagasForks])
}

export default globalSagas
