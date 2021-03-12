import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getVehiculesRequest: ['response'],
    getVehiculesSuccess: ['response', 'loading'],
    getVehiculesFailure: ['error'],
})

export const getVehiculesTypes = Types
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
const getVehiculesRequest = state => state.merge({ loading: true })

/**
 * reducers action request
 * @param {*} state
 */
const getVehiculesSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action request
 * @param {*} state
 */
const getVehiculesFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_VEHICULES_REQUEST]: getVehiculesRequest,
    [Types.GET_VEHICULES_SUCCESS]: getVehiculesSuccess,
    [Types.GET_VEHICULES_FAILURE]: getVehiculesFailure,
})
