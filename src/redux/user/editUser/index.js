import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    editUserRequest: ['response'],
    editUserSuccess: ['loading', 'response'],
    editUserFailure: ['error'],
})

export const editUserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    success: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */
/**
 * reducers action request
 *
 * @param {*} state
 */

const editUserRequest = state => state.merge({ loading: true })

/**
 * reducers action sucess
 *
 * @param {*} state
 */
const editUserSuccess = (state, { response }) =>
    state.merge({
        loading: false,
        success: true,
        error: false,
        response,
    })
/**
 * reducers action failure
 *
 * @param {*} state
 * @param {*} { error }
 * @returns
 */
const editUserFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        loading: false,
        success: false,
        error: true,
        response,
    })
}

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.EDIT_USER_REQUEST]: editUserRequest,
    [Types.EDIT_USER_SUCCESS]: editUserSuccess,
    [Types.EDIT_USER_FAILURE]: editUserFailure,
})
