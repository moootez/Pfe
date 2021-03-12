import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    updateInscriptionStatusRequest: ['response'],
    updateInscriptionStatusSuccess: ['response', 'loading'],
    updateInscriptionStatusFailure: ['error'],
})

export const updateInscriptionStatusTypes = Types
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
const updateInscriptionStatusRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const updateInscriptionStatusSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const updateInscriptionStatusFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.UPDATE_INSCRIPTION_STATUS_REQUEST]: updateInscriptionStatusRequest,
    [Types.UPDATE_INSCRIPTION_STATUS_SUCCESS]: updateInscriptionStatusSuccess,
    [Types.UPDATE_INSCRIPTION_STATUS_FAILURE]: updateInscriptionStatusFailure,
})
