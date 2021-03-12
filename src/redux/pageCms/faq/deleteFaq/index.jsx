import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    deleteFaqRequest: ['response'],
    deleteFaqSuccess: ['response', 'loading'],
    deleteFaqFailure: ['error'],
})

export const deleteFaqTypes = Types
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
const deleteFaqSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const deleteFaqFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const deleteFaqRequest = state => state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.DELETE_FAQ_REQUEST]: deleteFaqRequest,
    [Types.DELETE_FAQ_SUCCESS]: deleteFaqSuccess,
    [Types.DELETE_FAQ_FAILURE]: deleteFaqFailure,
})
