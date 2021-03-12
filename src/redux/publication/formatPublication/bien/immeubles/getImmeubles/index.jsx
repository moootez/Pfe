import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getImmeublesPublicationRequest: ['response'],
    getImmeublesPublicationSuccess: ['response', 'loading'],
    getImmeublesPublicationFailure: ['error'],
})

export const getImmeublesPublicationTypes = Types
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
const getImmeublesPublicationRequest = state => state.merge({ loading: true })

/**
 * reducers action request
 * @param {*} state
 */
const getImmeublesPublicationSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action request
 * @param {*} state
 */
const getImmeublesPublicationFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_IMMEUBLES_PUBLICATION_REQUEST]: getImmeublesPublicationRequest,
    [Types.GET_IMMEUBLES_PUBLICATION_SUCCESS]: getImmeublesPublicationSuccess,
    [Types.GET_IMMEUBLES_PUBLICATION_FAILURE]: getImmeublesPublicationFailure,
})
