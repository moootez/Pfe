import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getUsersByRoleRequest: ['response'],
    getUsersByRoleSuccess: ['response', 'loading'],
    getUsersByRoleFailure: ['error'],
})

export const getUsersByRoleTypes = Types
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

const getUsersByRoleRequest = state => state.merge({ loading: true })

const getUsersByRoleSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

const getUsersByRoleFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        loading: false,
        error: true,
        response,
    })
}

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_USERS_BY_ROLE_REQUEST]: getUsersByRoleRequest,
    [Types.GET_USERS_BY_ROLE_SUCCESS]: getUsersByRoleSuccess,
    [Types.GET_USERS_BY_ROLE_FAILURE]: getUsersByRoleFailure,
})
