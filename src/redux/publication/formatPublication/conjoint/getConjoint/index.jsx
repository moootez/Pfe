import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getConjointPublicationRequest: ['response'],
    getConjointPublicationSuccess: ['response', 'loading'],
    getConjointPublicationFailure: ['error'],
})

export const getConjointTypes = Types
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
const getConjointPublicationSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action request
 * @param {*} state
 */
const getConjointPublicationFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const getConjointPublicationRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_CONJOINT_PUBLICATION_REQUEST]: getConjointPublicationRequest,
    [Types.GET_CONJOINT_PUBLICATION_SUCCESS]: getConjointPublicationSuccess,
    [Types.GET_CONJOINT_PUBLICATION_FAILURE]: getConjointPublicationFailure,
})
