import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getImmeublesRequest: ['response'],
    getImmeublesSuccess: ['response', 'loading'],
    getImmeublesFailure: ['error'],
})

export const getImmeublesTypes = Types
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
const getImmeublesRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getImmeublesSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getImmeublesFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_IMMEUBLES_REQUEST]: getImmeublesRequest,
    [Types.GET_IMMEUBLES_SUCCESS]: getImmeublesSuccess,
    [Types.GET_IMMEUBLES_FAILURE]: getImmeublesFailure,
})
