import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    deleteDeclarationAssujettiRequest: ['response'],
    deleteDeclarationAssujettiSuccess: ['response', 'loading'],
    deleteDeclarationAssujettiFailure: ['error'],
})

export const deleteDeclarationAssujettiTypes = Types
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

/**
 * reducers action request
 * @param {*} state
 */
const deleteDeclarationAssujettiRequest = state =>
    state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const deleteDeclarationAssujettiSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const deleteDeclarationAssujettiFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        loading: false,
        error: true,
        response,
    })
}

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.DELETE_DECLARATION_ASSUJETTI_REQUEST]: deleteDeclarationAssujettiRequest,
    [Types.DELETE_DECLARATION_ASSUJETTI_SUCCESS]: deleteDeclarationAssujettiSuccess,
    [Types.DELETE_DECLARATION_ASSUJETTI_FAILURE]: deleteDeclarationAssujettiFailure,
})
