import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getFilterInscriptionRequest: ['response'],
    getFilterInscriptionSuccess: ['response', 'loading'],
    getFilterInscriptionFailure: ['error'],
})

export const getFilterInscriptionTypes = Types
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
const getFilterInscriptionRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getFilterInscriptionSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getFilterInscriptionFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_FILTER_INSCRIPTION_REQUEST]: getFilterInscriptionRequest,
    [Types.GET_FILTER_INSCRIPTION_SUCCESS]: getFilterInscriptionSuccess,
    [Types.GET_FILTER_INSCRIPTION_FAILURE]: getFilterInscriptionFailure,
})
