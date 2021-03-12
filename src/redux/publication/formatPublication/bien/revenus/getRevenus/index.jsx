import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getRevenusPublicationRequest: ['response'],
    getRevenusPublicationSuccess: ['response', 'loading'],
    getRevenusPublicationFailure: ['error'],
})

export const getRevenusPublicationTypes = Types
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
const getRevenusPublicationRequest = state => state.merge({ loading: true })

/**
 * reducers action request
 * @param {*} state
 */
const getRevenusPublicationSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action request
 * @param {*} state
 */
const getRevenusPublicationFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_REVENUS_PUBLICATION_REQUEST]: getRevenusPublicationRequest,
    [Types.GET_REVENUS_PUBLICATION_SUCCESS]: getRevenusPublicationSuccess,
    [Types.GET_REVENUS_PUBLICATION_FAILURE]: getRevenusPublicationFailure,
})
