import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getAllRolesRequest: ['response'],
    getAllRolesSuccess: ['response'],
    getAllRolesFailure: ['error'],
})

export const getAllRolesTypes = Types
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
const getAllRolesSuccess = (state, { response }) =>
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
const getAllRolesFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })
/**
 * reducers action sucess
 *
 * @param {*} state
 */
const getAllRolesRequest = state => state.merge({ loading: true })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ALL_ROLES_REQUEST]: getAllRolesRequest,
    [Types.GET_ALL_ROLES_SUCCESS]: getAllRolesSuccess,
    [Types.GET_ALL_ROLES_FAILURE]: getAllRolesFailure,
})
