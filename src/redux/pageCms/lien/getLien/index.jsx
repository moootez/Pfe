import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getLienRequest: ['response'],
    getLienSuccess: ['response', 'loading'],
    getLienFailure: ['error'],
})

export const getLienTypes = Types
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
const getLienSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const getLienFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const getLienRequest = state => state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_LIEN_REQUEST]: getLienRequest,
    [Types.GET_LIEN_SUCCESS]: getLienSuccess,
    [Types.GET_LIEN_FAILURE]: getLienFailure,
})
