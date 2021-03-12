import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    refusInscriptionRequest: ['response'],
    refusInscriptionSuccess: ['response', 'loading'],
    refusInscriptionFailure: ['error'],
})

export const refusInscriptionTypes = Types
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

/**
 * reducers action request
 * @param {*} state
 */
const refusInscriptionRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const refusInscriptionSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const refusInscriptionFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.REFUS_INSCRIPTION_REQUEST]: refusInscriptionRequest,
    [Types.REFUS_INSCRIPTION_SUCCESS]: refusInscriptionSuccess,
    [Types.REFUS_INSCRIPTION_FAILURE]: refusInscriptionFailure,
})
