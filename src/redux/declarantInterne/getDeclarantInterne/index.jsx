import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getFilterDeclarantInterneRequest: ['response'],
    getFilterDeclarantInterneSuccess: ['response', 'loading'],
    getFilterDeclarantInterneFailure: ['error'],
})

export const getFilterDeclarantInterneTypes = Types
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
const getFilterDeclarantInterneSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const getFilterDeclarantInterneFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const getFilterDeclarantInterneRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_FILTER_DECLARANT_INTERNE_REQUEST]: getFilterDeclarantInterneRequest,
    [Types.GET_FILTER_DECLARANT_INTERNE_SUCCESS]: getFilterDeclarantInterneSuccess,
    [Types.GET_FILTER_DECLARANT_INTERNE_FAILURE]: getFilterDeclarantInterneFailure,
})
