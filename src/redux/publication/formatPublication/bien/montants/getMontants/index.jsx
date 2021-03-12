import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getMontantsRequest: ['response'],
    getMontantsSuccess: ['response', 'loading'],
    getMontantsFailure: ['error'],
})

export const getMontantsTypes = Types
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
const getMontantsRequest = state => state.merge({ loading: true })

/**
 * reducers action request
 * @param {*} state
 */
const getMontantsSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action request
 * @param {*} state
 */
const getMontantsFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_MONTANTS_REQUEST]: getMontantsRequest,
    [Types.GET_MONTANTS_SUCCESS]: getMontantsSuccess,
    [Types.GET_MONTANTS_FAILURE]: getMontantsFailure,
})
