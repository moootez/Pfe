import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getRevenusRequest: ['response'],
    getRevenusSuccess: ['response', 'loading'],
    getRevenusFailure: ['error'],
})

export const getRevenusTypes = Types
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
const getRevenusRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getRevenusSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getRevenusFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_REVENUS_REQUEST]: getRevenusRequest,
    [Types.GET_REVENUS_SUCCESS]: getRevenusSuccess,
    [Types.GET_REVENUS_FAILURE]: getRevenusFailure,
})
