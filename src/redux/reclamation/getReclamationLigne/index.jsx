import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getReclamationLigneRequest: ['response'],
    getReclamationLigneSuccess: ['response', 'loading'],
    getReclamationLigneFailure: ['error'],
})

export const getReclamationLigneTypes = Types
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
const getReclamationLigneRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getReclamationLigneSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getReclamationLigneFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_RECLAMATION_LIGNE_REQUEST]: getReclamationLigneRequest,
    [Types.GET_RECLAMATION_LIGNE_SUCCESS]: getReclamationLigneSuccess,
    [Types.GET_RECLAMATION_LIGNE_FAILURE]: getReclamationLigneFailure,
})
