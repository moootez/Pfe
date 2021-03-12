import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getFilterDeclarationsAssujettiRequest: ['response'],
    getFilterDeclarationsAssujettiSuccess: ['response', 'loading'],
    getFilterDeclarationsAssujettiFailure: ['error'],
})

export const getFilterDeclarationsAssujettiTypes = Types
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
const getFilterDeclarationsAssujettiSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const getFilterDeclarationsAssujettiFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const getFilterDeclarationsAssujettiRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_FILTER_DECLARATIONS_ASSUJETTI_REQUEST]: getFilterDeclarationsAssujettiRequest,
    [Types.GET_FILTER_DECLARATIONS_ASSUJETTI_SUCCESS]: getFilterDeclarationsAssujettiSuccess,
    [Types.GET_FILTER_DECLARATIONS_ASSUJETTI_FAILURE]: getFilterDeclarationsAssujettiFailure,
})
