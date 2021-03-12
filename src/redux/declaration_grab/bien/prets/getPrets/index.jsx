import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getPretsRequest: ['response'],
    getPretsSuccess: ['response', 'loading'],
    getPretsFailure: ['error'],
})

export const getPretsTypes = Types
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
const getPretsRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getPretsSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getPretsFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_PRETS_REQUEST]: getPretsRequest,
    [Types.GET_PRETS_SUCCESS]: getPretsSuccess,
    [Types.GET_PRETS_FAILURE]: getPretsFailure,
})
