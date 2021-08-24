import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import { reducer as login } from './login'
import { reducer as wrapApi } from './wrapApi'
import referencial from './referencial'
import rapport from './rapport'
import declarationReception from './declaration'
import declarantInterne from './declarantInterne'
import users from './user'
import { reducer as info } from './language'
import { reducer as alert } from './alert'
import ImmutablePersistenceTransform from './ImmutablePersistenceTransform'
import etablissement from './etablissement'
import inscription from './inscription'
import statistique from './statistique'
import roles from './roles'
import parametres from './parametres'
import history from './history/index'
import pageCms from './pageCms'
import notification from './notification'
import commande from './commande'
import reclamation from './reclamation'
import { reducer as nbrDecParAction } from './tableauDeBord/nbrDecParAction'
import { reducer as nbrDecParStatusTraitees } from './tableauDeBord/nbrDecParStatusTraitees'
import { reducer as nbrDecParYear } from './tableauDeBord/nbrDecParYear'
import { reducer as nbrDecParStatusNonTraitees } from './tableauDeBord/nbrDecParStatusNonTraitees'
import { reducer as nbrDecParTempsTraitement } from './tableauDeBord/nbrDecParTempsTraitement'
import { reducer as nbrInscEnAttente } from './tableauDeBord/nbrInscEnAttente'

/*
 * render all redux reducers actions
 */

const containersReducer = {
    nbrInscEnAttente,
    nbrDecParTempsTraitement,
    nbrDecParStatusNonTraitees,
    nbrDecParYear,
    nbrDecParStatusTraitees,
    nbrDecParAction,
    notification,
    pageCms,
    statistique,
    alert,
    wrapApi,
    referencial,
    info,
    declarationReception,
    rapport,
    login,
    roles,
    users,
    etablissement,
    inscription,
    declarantInterne,
    parametres,
    history,
    commande,
    reclamation,
}
/*
 * enregistrer les données dans redux store
 */

const persistConfig = {
    key: 'root',
    storage,
    transforms: [ImmutablePersistenceTransform],
    whitelist: ['login', 'referencial', 'info', 'router'],
}

const appReducer = combineReducers({
    ...containersReducer,
    router: routerReducer,
})

/**
 * render state et action ou test if logout
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const rootReducer = (state, action) => {
    if (action.type === 'SIGNOUT_REQUEST') {
        Object.keys(state).forEach(key => {
            storage.removeItem(`persist:${key}`)
        })
        /*eslint-disable */
        state = undefined
        localStorage.setItem('InluccToken', '')
    }
    return appReducer(state, action)
}

/**
 *
 *
 */
const createGlobalReducer = () => persistReducer(persistConfig, rootReducer)
export default createGlobalReducer
