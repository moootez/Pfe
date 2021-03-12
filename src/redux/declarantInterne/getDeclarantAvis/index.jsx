import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getDeclarantAvisRequest: ['response'],
    getDeclarantAvisSuccess: ['response', 'loading'],
    getDeclarantAvisFailure: ['error'],
})

export const getDeclarantAvisTypes = Types
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
const getDeclarantAvisSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const getDeclarantAvisFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const getDeclarantAvisRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_DECLARANT_AVIS_REQUEST]: getDeclarantAvisRequest,
    [Types.GET_DECLARANT_AVIS_SUCCESS]: getDeclarantAvisSuccess,
    [Types.GET_DECLARANT_AVIS_FAILURE]: getDeclarantAvisFailure,
})
