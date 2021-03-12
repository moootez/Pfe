import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    addRapportContenuRequest: ['response'],
    addRapportContenuSuccess: ['response', 'loading'],
    addRapportContenuFailure: ['error'],
})

export const addRapportContenuTypes = Types
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
const addRapportContenuSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const addRapportContenuFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const addRapportContenuRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_RAPPORT_CONTENU_REQUEST]: addRapportContenuRequest,
    [Types.ADD_RAPPORT_CONTENU_SUCCESS]: addRapportContenuSuccess,
    [Types.ADD_RAPPORT_CONTENU_FAILURE]: addRapportContenuFailure,
})
