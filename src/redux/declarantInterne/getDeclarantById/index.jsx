import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getDeclarantInterneRequest: ['response'],
    getDeclarantInterneSuccess: ['response', 'loading'],
    getDeclarantInterneFailure: ['error'],
})

export const getDeclarantInterneTypes = Types
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
const getDeclarantInterneSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const getDeclarantInterneFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const getDeclarantInterneRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_DECLARANT_INTERNE_REQUEST]: getDeclarantInterneRequest,
    [Types.GET_DECLARANT_INTERNE_SUCCESS]: getDeclarantInterneSuccess,
    [Types.GET_DECLARANT_INTERNE_FAILURE]: getDeclarantInterneFailure,
})
