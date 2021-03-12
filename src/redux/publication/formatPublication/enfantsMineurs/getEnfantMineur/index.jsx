import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getEnfantPublicationRequest: ['response'],
    getEnfantPublicationSuccess: ['response', 'loading'],
    getEnfantPublicationFailure: ['error'],
})

export const getEnfantTypes = Types
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
const getEnfantPublicationRequest = state => state.merge({ loading: true })

/**
 * reducers action request
 * @param {*} state
 */
const getEnfantPublicationSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action request
 * @param {*} state
 */
const getEnfantPublicationFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ENFANT_PUBLICATION_REQUEST]: getEnfantPublicationRequest,
    [Types.GET_ENFANT_PUBLICATION_SUCCESS]: getEnfantPublicationSuccess,
    [Types.GET_ENFANT_PUBLICATION_FAILURE]: getEnfantPublicationFailure,
})
