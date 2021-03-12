import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getAllCodePostalRequest: ['response'],
    getAllCodePostalSuccess: ['response', 'loading'],
    getAllCodePostalFailure: ['error'],
})

export const getAllCodePostalTypes = Types
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

const getAllCodePostalRequest = state => state.merge({ loading: true })

const getAllCodePostalSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

const getAllCodePostalFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ALL_CODE_POSTAL_REQUEST]: getAllCodePostalRequest,
    [Types.GET_ALL_CODE_POSTAL_SUCCESS]: getAllCodePostalSuccess,
    [Types.GET_ALL_CODE_POSTAL_FAILURE]: getAllCodePostalFailure,
})
