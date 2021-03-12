import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    editTextJuridiqueRequest: ['response'],
    editTextJuridiqueSuccess: ['response', 'loading'],
    editTextJuridiqueFailure: ['error'],
})

export const editTextJuridiqueTypes = Types
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
const editTextJuridiqueSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const editTextJuridiqueFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const editTextJuridiqueRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.EDIT_TEXT_JURIDIQUE_REQUEST]: editTextJuridiqueRequest,
    [Types.EDIT_TEXT_JURIDIQUE_SUCCESS]: editTextJuridiqueSuccess,
    [Types.EDIT_TEXT_JURIDIQUE_FAILURE]: editTextJuridiqueFailure,
})
