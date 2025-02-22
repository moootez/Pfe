import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getAllUsersRequest: ['response'],
    getAllUsersSuccess: ['response'],
    getAllUsersFailure: ['error'],
})

export const getAllUsersTypes = Types
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
const getAllUsersSuccess = (state, { response }) =>
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
const getAllUsersFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action sucess
 *
 * @param {*} state
 */
const getAllUsersRequest = state => state.merge({ loading: true })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ALL_USERS_REQUEST]: getAllUsersRequest,
    [Types.GET_ALL_USERS_SUCCESS]: getAllUsersSuccess,
    [Types.GET_ALL_USERS_FAILURE]: getAllUsersFailure,
})
