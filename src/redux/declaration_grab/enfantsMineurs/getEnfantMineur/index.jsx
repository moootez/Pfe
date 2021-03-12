import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getEnfantRequest: ['response'],
    getEnfantSuccess: ['response', 'loading'],
    getEnfantFailure: ['error'],
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
const getEnfantRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getEnfantSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getEnfantFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ENFANT_REQUEST]: getEnfantRequest,
    [Types.GET_ENFANT_SUCCESS]: getEnfantSuccess,
    [Types.GET_ENFANT_FAILURE]: getEnfantFailure,
})
