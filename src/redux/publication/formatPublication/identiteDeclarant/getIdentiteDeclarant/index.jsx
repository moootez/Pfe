import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getIdentiteDeclarantPublicationRequest: ['response'],
    getIdentiteDeclarantPublicationSuccess: ['response', 'loading'],
    getIdentiteDeclarantPublicationFailure: ['error'],
})

export const getIdentiteDeclarantTypes = Types
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
const getIdentiteDeclarantPublicationRequest = state =>
    state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getIdentiteDeclarantPublicationSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getIdentiteDeclarantPublicationFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_IDENTITE_DECLARANT_PUBLICATION_REQUEST]: getIdentiteDeclarantPublicationRequest,
    [Types.GET_IDENTITE_DECLARANT_PUBLICATION_SUCCESS]: getIdentiteDeclarantPublicationSuccess,
    [Types.GET_IDENTITE_DECLARANT_PUBLICATION_FAILURE]: getIdentiteDeclarantPublicationFailure,
})
