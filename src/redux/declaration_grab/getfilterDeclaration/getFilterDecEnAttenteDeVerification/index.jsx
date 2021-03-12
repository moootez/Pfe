import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getFilterDeclarationsEnAttenteDeVerificationRequest: ['response'],
    getFilterDeclarationsEnAttenteDeVerificationSuccess: [
        'response',
        'loading',
    ],
    getFilterDeclarationsEnAttenteDeVerificationFailure: ['error'],
})

export const getFilterDeclarationsEnAttenteDeVerificationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

/**
 * reducers action success
 * @param {*} state
 */
const getFilterDeclarationsEnAttenteDeVerificationSuccess = (
    state,
    { response }
) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const getFilterDeclarationsEnAttenteDeVerificationFailure = (
    state,
    { error }
) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const getFilterDeclarationsEnAttenteDeVerificationRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_FILTER_DECLARATIONS_EN_ATTENTE_DE_VERIFICATION_REQUEST]: getFilterDeclarationsEnAttenteDeVerificationRequest,
    [Types.GET_FILTER_DECLARATIONS_EN_ATTENTE_DE_VERIFICATION_SUCCESS]: getFilterDeclarationsEnAttenteDeVerificationSuccess,
    [Types.GET_FILTER_DECLARATIONS_EN_ATTENTE_DE_VERIFICATION_FAILURE]: getFilterDeclarationsEnAttenteDeVerificationFailure,
})
