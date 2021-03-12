import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    addUserRequest: ['response'],
    addUserSuccess: ['response', 'loading'],
    addUserFailure: ['error'],
})

export const addUserTypes = Types
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

const addUserRequest = state => state.merge({ loading: true })

/**
 * reducers action sucess
 *
 * @param {*} state
 */
const addUserSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })
/**
 * reducers action failure
 *
 * @param {*} state
 * @param {*} { error }
 * @returns
 */
const addUserFailure = (state, { error }) => {
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
    [Types.ADD_USER_REQUEST]: addUserRequest,
    [Types.ADD_USER_SUCCESS]: addUserSuccess,
    [Types.ADD_USER_FAILURE]: addUserFailure,
})
