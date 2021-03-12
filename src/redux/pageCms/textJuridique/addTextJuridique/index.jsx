import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    addTextJuridiqueRequest: ['response'],
    addTextJuridiqueSuccess: ['response', 'loading'],
    addTextJuridiqueFailure: ['error'],
})

export const addTextJuridiqueTypes = Types
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
const addTextJuridiqueSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const addTextJuridiqueFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const addTextJuridiqueRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_TEXT_JURIDIQUE_REQUEST]: addTextJuridiqueRequest,
    [Types.ADD_TEXT_JURIDIQUE_SUCCESS]: addTextJuridiqueSuccess,
    [Types.ADD_TEXT_JURIDIQUE_FAILURE]: addTextJuridiqueFailure,
})
