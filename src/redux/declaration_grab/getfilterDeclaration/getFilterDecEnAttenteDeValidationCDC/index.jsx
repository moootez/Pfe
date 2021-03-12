import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getFilterDeclarationsEnAttenteDeValidationCDCRequest: ['response'],
    getFilterDeclarationsEnAttenteDeValidationCDCSuccess: [
        'response',
        'loading',
    ],
    getFilterDeclarationsEnAttenteDeValidationCDCFailure: ['error'],
})

export const getFilterDeclarationsEnAttenteDeValidationCDCTypes = Types
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
const getFilterDeclarationsEnAttenteDeValidationCDCSuccess = (
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
const getFilterDeclarationsEnAttenteDeValidationCDCFailure = (
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
const getFilterDeclarationsEnAttenteDeValidationCDCRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_FILTER_DECLARATIONS_EN_ATTENTE_DE_VALIDATION_CDC_REQUEST]: getFilterDeclarationsEnAttenteDeValidationCDCRequest,
    [Types.GET_FILTER_DECLARATIONS_EN_ATTENTE_DE_VALIDATION_CDC_SUCCESS]: getFilterDeclarationsEnAttenteDeValidationCDCSuccess,
    [Types.GET_FILTER_DECLARATIONS_EN_ATTENTE_DE_VALIDATION_CDC_FAILURE]: getFilterDeclarationsEnAttenteDeValidationCDCFailure,
})
