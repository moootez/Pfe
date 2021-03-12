import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getActionsRequest: ['response'],
    getActionsSuccess: ['response', 'loading'],
    getActionsFailure: ['error'],
})

export const getActionsTypes = Types
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
const getActionsRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getActionsSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getActionsFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ACTIONS_REQUEST]: getActionsRequest,
    [Types.GET_ACTIONS_SUCCESS]: getActionsSuccess,
    [Types.GET_ACTIONS_FAILURE]: getActionsFailure,
})
