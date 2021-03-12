import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getHistoryRequest: ['response'],
    getHistorySuccess: ['response'],
    getHistoryFailure: ['error'],
})

export const getHistoryTypes = Types
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
 * reducers action success
 * @param {*} state
 */
const getHistorySuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const getHistoryFailure = state =>
    state.merge({
        loading: false,
        error: true,
    })
/**
 * reducers action request
 * @param {*} state
 */
const getHistoryRequest = state => state.merge({ loading: true })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_HISTORY_REQUEST]: getHistoryRequest,
    [Types.GET_HISTORY_SUCCESS]: getHistorySuccess,
    [Types.GET_HISTORY_FAILURE]: getHistoryFailure,
})
