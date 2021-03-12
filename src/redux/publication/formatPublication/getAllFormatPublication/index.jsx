import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getAllFormatPublicationRequest: ['response'],
    getAllFormatPublicationSuccess: ['response', 'loading'],
    getAllFormatPublicationFailure: ['error'],
})

export const getAllFormatTypes = Types
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
const getAllFormatPublicationRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getAllFormatPublicationSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getAllFormatPublicationFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ALL_FORMAT_PUBLICATION_REQUEST]: getAllFormatPublicationRequest,
    [Types.GET_ALL_FORMAT_PUBLICATION_SUCCESS]: getAllFormatPublicationSuccess,
    [Types.GET_ALL_FORMAT_PUBLICATION_FAILURE]: getAllFormatPublicationFailure,
})
