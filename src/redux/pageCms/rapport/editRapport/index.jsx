import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    editRapportContenuRequest: ['response'],
    editRapportContenuSuccess: ['response', 'loading'],
    editRapportContenuFailure: ['error'],
})

export const editRapportContenuTypes = Types
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
const editRapportContenuSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const editRapportContenuFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const editRapportContenuRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.EDIT_RAPPORT_CONTENU_REQUEST]: editRapportContenuRequest,
    [Types.EDIT_RAPPORT_CONTENU_SUCCESS]: editRapportContenuSuccess,
    [Types.EDIT_RAPPORT_CONTENU_FAILURE]: editRapportContenuFailure,
})
