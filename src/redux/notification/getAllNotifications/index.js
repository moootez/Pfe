import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getAllNotificationsRequest: ['response'],
    getAllNotificationsSuccess: ['response', 'loading'],
    getAllNotificationsFailure: ['error'],
})

export const getAllNotificationsTypes = Types
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
 *
 * @param {*} state
 */

const getAllNotificationsSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 *
 * @param {*} state
 * @param {*} { error }
 * @returns
 */
const getAllNotificationsFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action sucess
 *
 * @param {*} state
 */
const getAllNotificationsRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ALL_NOTIFICATIONS_REQUEST]: getAllNotificationsRequest,
    [Types.GET_ALL_NOTIFICATIONS_SUCCESS]: getAllNotificationsSuccess,
    [Types.GET_ALL_NOTIFICATIONS_FAILURE]: getAllNotificationsFailure,
})
