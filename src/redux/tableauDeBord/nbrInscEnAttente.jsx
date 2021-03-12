import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    nbrInscEnAttenteRequest: ['response'],
    nbrInscEnAttenteSuccess: ['response', 'loading'],
    nbrInscEnAttenteFailure: ['error'],
})

export const nbrInscEnAttenteTypes = Types
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
const nbrInscEnAttenteSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const nbrInscEnAttenteFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const nbrInscEnAttenteRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.NBR_INSC_EN_ATTENTE_REQUEST]: nbrInscEnAttenteRequest,
    [Types.NBR_INSC_EN_ATTENTE_SUCCESS]: nbrInscEnAttenteSuccess,
    [Types.NBR_INSC_EN_ATTENTE_FAILURE]: nbrInscEnAttenteFailure,
})
