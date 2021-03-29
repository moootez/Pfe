import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getReclamationRequest: ['response'],
    getReclamationSuccess: ['response', 'loading'],
    getReclamationFailure: ['error'],
})

export const getReclamationTypes = Types
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
const getReclamationRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getReclamationSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getReclamationFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_RECLAMATION_REQUEST]: getReclamationRequest,
    [Types.GET_RECLAMATION_SUCCESS]: getReclamationSuccess,
    [Types.GET_RECLAMATION_FAILURE]: getReclamationFailure,
})
