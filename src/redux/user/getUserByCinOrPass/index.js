import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getUserByTokenRequest: ['response'],
    getUserByTokenSuccess: ['response', 'loading'],
    getUserByTokenFailure: ['error'],
})

export const getUserByTokenTypes = Types
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

const getUserByTokenRequest = state => state.merge({ loading: true })

/**
 * reducers action sucess
 *
 * @param {*} state
 */
const getUserByTokenSuccess = (state, { response }) =>
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
const getUserByTokenFailure = (state, { error }) => {
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
    [Types.GET_USER_BY_TOKEN_REQUEST]: getUserByTokenRequest,
    [Types.GET_USER_BY_TOKEN_SUCCESS]: getUserByTokenSuccess,
    [Types.GET_USER_BY_TOKEN_FAILURE]: getUserByTokenFailure,
})
