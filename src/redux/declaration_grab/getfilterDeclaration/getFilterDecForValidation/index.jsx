import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getFilterDeclarationsForValidationRequest: ['response'],
    getFilterDeclarationsForValidationSuccess: ['response', 'loading'],
    getFilterDeclarationsForValidationFailure: ['error'],
})

export const getFilterDeclarationsForValidationTypes = Types
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
const getFilterDeclarationsForValidationSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const getFilterDeclarationsForValidationFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const getFilterDeclarationsForValidationRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_FILTER_DECLARATIONS_FOR_VALIDATION_REQUEST]: getFilterDeclarationsForValidationRequest,
    [Types.GET_FILTER_DECLARATIONS_FOR_VALIDATION_SUCCESS]: getFilterDeclarationsForValidationSuccess,
    [Types.GET_FILTER_DECLARATIONS_FOR_VALIDATION_FAILURE]: getFilterDeclarationsForValidationFailure,
})
