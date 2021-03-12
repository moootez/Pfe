import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    addConjointDeclarationsRequest: ['response'],
    addConjointDeclarationsSuccess: ['response', 'loading'],
    addConjointDeclarationsFailure: ['error'],
})

export const addConjointDeclarationsTypes = Types
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
const addConjointDeclarationsSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const addConjointDeclarationsFailure = (state, { error }) => {
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
const addConjointDeclarationsRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_CONJOINT_DECLARATIONS_REQUEST]: addConjointDeclarationsRequest,
    [Types.ADD_CONJOINT_DECLARATIONS_SUCCESS]: addConjointDeclarationsSuccess,
    [Types.ADD_CONJOINT_DECLARATIONS_FAILURE]: addConjointDeclarationsFailure,
})
