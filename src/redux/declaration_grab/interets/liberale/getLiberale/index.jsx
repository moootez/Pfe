import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getLiberaleRequest: ['response'],
    getLiberaleSuccess: ['response', 'loading'],
    getLiberaleFailure: ['error'],
})

export const getLiberaleTypes = Types
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
const getLiberaleRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getLiberaleSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getLiberaleFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_LIBERALE_REQUEST]: getLiberaleRequest,
    [Types.GET_LIBERALE_SUCCESS]: getLiberaleSuccess,
    [Types.GET_LIBERALE_FAILURE]: getLiberaleFailure,
})
