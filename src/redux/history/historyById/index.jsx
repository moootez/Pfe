import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getHistoryByIDRequest: ['response'],
    getHistoryByIDSuccess: ['response'],
    getHistoryByIDFailure: ['error'],
})

export const getHistoryByIDTypes = Types
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
const getHistoryByIDSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const getHistoryByIDFailure = state =>
    state.merge({
        loading: false,
        error: true,
    })
/**
 * reducers action request
 * @param {*} state
 */
const getHistoryByIDRequest = state => state.merge({ loading: true })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_HISTORY_BY_ID_REQUEST]: getHistoryByIDRequest,
    [Types.GET_HISTORY_BY_ID_SUCCESS]: getHistoryByIDSuccess,
    [Types.GET_HISTORY_BY_ID_FAILURE]: getHistoryByIDFailure,
})
