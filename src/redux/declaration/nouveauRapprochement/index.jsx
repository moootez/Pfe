import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    nouveauRapprochementRequest: ['response'],
    nouveauRapprochementSuccess: ['response', 'loading'],
    nouveauRapprochementFailure: ['error'],
})

export const nouveauRapprochementTypes = Types
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
const nouveauRapprochementSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const nouveauRapprochementFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const nouveauRapprochementRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.NOUVEAU_RAPPROCHEMENT_REQUEST]: nouveauRapprochementRequest,
    [Types.NOUVEAU_RAPPROCHEMENT_SUCCESS]: nouveauRapprochementSuccess,
    [Types.NOUVEAU_RAPPROCHEMENT_FAILURE]: nouveauRapprochementFailure,
})
