import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getFilterDeclarationsEnAttenteDeRapprochementRequest: ['response'],
    getFilterDeclarationsEnAttenteDeRapprochementSuccess: [
        'response',
        'loading',
    ],
    getFilterDeclarationsEnAttenteDeRapprochementFailure: ['error'],
})

export const getFilterDeclarationsEnAttenteDeRapprochementTypes = Types
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
const getFilterDeclarationsEnAttenteDeRapprochementSuccess = (
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
const getFilterDeclarationsEnAttenteDeRapprochementFailure = (
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
const getFilterDeclarationsEnAttenteDeRapprochementRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_FILTER_DECLARATIONS_EN_ATTENTE_DE_RAPPROCHEMENT_REQUEST]: getFilterDeclarationsEnAttenteDeRapprochementRequest,
    [Types.GET_FILTER_DECLARATIONS_EN_ATTENTE_DE_RAPPROCHEMENT_SUCCESS]: getFilterDeclarationsEnAttenteDeRapprochementSuccess,
    [Types.GET_FILTER_DECLARATIONS_EN_ATTENTE_DE_RAPPROCHEMENT_FAILURE]: getFilterDeclarationsEnAttenteDeRapprochementFailure,
})
