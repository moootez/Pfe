import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    changePasswordRequest: ['response'],
    changePasswordSuccess: ['response', 'loading'],
    changePasswordFailure: ['error'],
})

export const changePasswordTypes = Types
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

const changePasswordRequest = state => state.merge({ loading: true })

/**
 * reducers action sucess
 *
 * @param {*} state
 */
const changePasswordSuccess = (state, { response }) =>
    state.merge({
        error: false,
        success: true,
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
const changePasswordFailure = (state, { error }) => {
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
    [Types.CHANGE_PASSWORD_REQUEST]: changePasswordRequest,
    [Types.CHANGE_PASSWORD_SUCCESS]: changePasswordSuccess,
    [Types.CHANGE_PASSWORD_FAILURE]: changePasswordFailure,
})
