import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    dupliquerCommandeRequest: ['response'],
    dupliquerCommandeSuccess: ['response', 'loading'],
    dupliquerCommandeFailure: ['error'],
})

export const dupliquerCommandeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */
/**
 * reducers action request
 * @param {*} state
 */
const dupliquerCommandeSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const dupliquerCommandeFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        loading: false,
        error: true,
        response,
    })
}

/**
 * reducers action request
 * @param {*} state
 */
const dupliquerCommandeRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.DUPLIQUER_COMMANDE_REQUEST]: dupliquerCommandeRequest,
    [Types.DUPLIQUER_COMMANDE_SUCCESS]: dupliquerCommandeSuccess,
    [Types.DUPLIQUER_COMMANDE_FAILURE]: dupliquerCommandeFailure,
})
