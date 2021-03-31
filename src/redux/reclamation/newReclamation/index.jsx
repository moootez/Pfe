import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    addNewReclamationRequest: ['response'],
    addNewReclamationSuccess: ['response', 'loading'],
    addNewReclamationFailure: ['error'],
})

export const addNewReclamationTypes = Types
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
const addNewReclamationSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const addNewReclamationFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        loading: false,
        error: true,
        response,
    })
}

/**
 * reducers action request
 * @param {*} state
 */
const addNewReclamationRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_NEW_RECLAMATION_REQUEST]: addNewReclamationRequest,
    [Types.ADD_NEW_RECLAMATION_SUCCESS]: addNewReclamationSuccess,
    [Types.ADD_NEW_RECLAMATION_FAILURE]: addNewReclamationFailure,
})
