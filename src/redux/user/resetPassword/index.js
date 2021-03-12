import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    resetPasswordRequest: ['response'],
    resetPasswordSuccess: ['response', 'loading'],
    resetPasswordFailure: ['error'],
})

export const resetPasswordTypes = Types
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

const resetPasswordRequest = state => state.merge({ loading: true })

/**
 * reducers action sucess
 *
 * @param {*} state
 */
const resetPasswordSuccess = (state, { response }) =>
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
const resetPasswordFailure = (state, { error }) => {
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
    [Types.RESET_PASSWORD_REQUEST]: resetPasswordRequest,
    [Types.RESET_PASSWORD_SUCCESS]: resetPasswordSuccess,
    [Types.RESET_PASSWORD_FAILURE]: resetPasswordFailure,
})
