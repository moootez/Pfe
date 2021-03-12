import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    updateFormatPublicationRequest: ['response'],
    updateFormatPublicationSuccess: ['response', 'loading'],
    updateFormatPublicationFailure: ['error'],
})

export const updateFormatTypes = Types
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
const updateFormatPublicationRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const updateFormatPublicationSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const updateFormatPublicationFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.UPDATE_FORMAT_PUBLICATION_REQUEST]: updateFormatPublicationRequest,
    [Types.UPDATE_FORMAT_PUBLICATION_SUCCESS]: updateFormatPublicationSuccess,
    [Types.UPDATE_FORMAT_PUBLICATION_FAILURE]: updateFormatPublicationFailure,
})
