import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    deleteLienRequest: ['response'],
    deleteLienSuccess: ['response', 'loading'],
    deleteLienFailure: ['error'],
})

export const deleteLienTypes = Types
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
const deleteLienSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const deleteLienFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const deleteLienRequest = state => state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.DELETE_LIEN_REQUEST]: deleteLienRequest,
    [Types.DELETE_LIEN_SUCCESS]: deleteLienSuccess,
    [Types.DELETE_LIEN_FAILURE]: deleteLienFailure,
})
