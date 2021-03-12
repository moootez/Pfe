import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    deleteTextJuridiqueRequest: ['response'],
    deleteTextJuridiqueSuccess: ['response', 'loading'],
    deleteTextJuridiqueFailure: ['error'],
})

export const deleteTextJuridiqueTypes = Types
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
const deleteTextJuridiqueSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const deleteTextJuridiqueFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const deleteTextJuridiqueRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.DELETE_TEXT_JURIDIQUE_REQUEST]: deleteTextJuridiqueRequest,
    [Types.DELETE_TEXT_JURIDIQUE_SUCCESS]: deleteTextJuridiqueSuccess,
    [Types.DELETE_TEXT_JURIDIQUE_FAILURE]: deleteTextJuridiqueFailure,
})
