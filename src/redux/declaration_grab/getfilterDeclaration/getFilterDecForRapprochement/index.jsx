import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getFilterDeclarationsForRapprochementRequest: ['response'],
    getFilterDeclarationsForRapprochementSuccess: ['response', 'loading'],
    getFilterDeclarationsForRapprochementFailure: ['error'],
})

export const getFilterDeclarationsForRapprochementTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

/**
 * reducers action success
 * @param {*} state
 */
const getFilterDeclarationsForRapprochementSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const getFilterDeclarationsForRapprochementFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const getFilterDeclarationsForRapprochementRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_FILTER_DECLARATIONS_FOR_RAPPROCHEMENT_REQUEST]: getFilterDeclarationsForRapprochementRequest,
    [Types.GET_FILTER_DECLARATIONS_FOR_RAPPROCHEMENT_SUCCESS]: getFilterDeclarationsForRapprochementSuccess,
    [Types.GET_FILTER_DECLARATIONS_FOR_RAPPROCHEMENT_FAILURE]: getFilterDeclarationsForRapprochementFailure,
})
