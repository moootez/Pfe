import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getFilterDeclarationsForPublicationRequest: ['response'],
    getFilterDeclarationsForPublicationSuccess: ['response', 'loading'],
    getFilterDeclarationsForPublicationFailure: ['error'],
})

export const getFilterDeclarationsForPublicationTypes = Types
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
const getFilterDeclarationsForPublicationSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const getFilterDeclarationsForPublicationFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const getFilterDeclarationsForPublicationRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_FILTER_DECLARATIONS_FOR_PUBLICATION_REQUEST]: getFilterDeclarationsForPublicationRequest,
    [Types.GET_FILTER_DECLARATIONS_FOR_PUBLICATION_SUCCESS]: getFilterDeclarationsForPublicationSuccess,
    [Types.GET_FILTER_DECLARATIONS_FOR_PUBLICATION_FAILURE]: getFilterDeclarationsForPublicationFailure,
})
