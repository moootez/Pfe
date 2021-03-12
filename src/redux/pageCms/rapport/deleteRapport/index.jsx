import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    deleteRapportContenuRequest: ['response'],
    deleteRapportContenuSuccess: ['response', 'loading'],
    deleteRapportContenuFailure: ['error'],
})

export const deleteRapportContenuTypes = Types
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
const deleteRapportContenuSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const deleteRapportContenuFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const deleteRapportContenuRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.DELETE_RAPPORT_CONTENU_REQUEST]: deleteRapportContenuRequest,
    [Types.DELETE_RAPPORT_CONTENU_SUCCESS]: deleteRapportContenuSuccess,
    [Types.DELETE_RAPPORT_CONTENU_FAILURE]: deleteRapportContenuFailure,
})
