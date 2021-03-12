import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    updateIdentiteDeclarantPublicationRequest: ['response'],
    updateIdentiteDeclarantPublicationSuccess: ['response', 'loading'],
    updateIdentiteDeclarantPublicationFailure: ['error'],
})

export const updateIdentiteDeclarantTypes = Types
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
const updateIdentiteDeclarantPublicationRequest = state =>
    state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const updateIdentiteDeclarantPublicationSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const updateIdentiteDeclarantPublicationFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.UPDATE_IDENTITE_DECLARANT_PUBLICATION_REQUEST]: updateIdentiteDeclarantPublicationRequest,
    [Types.UPDATE_IDENTITE_DECLARANT_PUBLICATION_SUCCESS]: updateIdentiteDeclarantPublicationSuccess,
    [Types.UPDATE_IDENTITE_DECLARANT_PUBLICATION_FAILURE]: updateIdentiteDeclarantPublicationFailure,
})
