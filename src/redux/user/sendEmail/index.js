import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    sendEmailRequest: ['response'],
    sendEmailSuccess: ['response', 'loading'],
    sendEmailFailure: ['error'],
})

export const sendEmailTypes = Types
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

const sendEmailRequest = state => state.merge({ loading: true })

/**
 * reducers action sucess
 *
 * @param {*} state
 */
const sendEmailSuccess = (state, { response }) =>
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
const sendEmailFailure = (state, { error }) => {
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
    [Types.SEND_EMAIL_REQUEST]: sendEmailRequest,
    [Types.SEND_EMAIL_SUCCESS]: sendEmailSuccess,
    [Types.SEND_EMAIL_FAILURE]: sendEmailFailure,
})
