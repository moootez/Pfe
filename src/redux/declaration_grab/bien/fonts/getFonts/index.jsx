import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getFontsRequest: ['response'],
    getFontsSuccess: ['response', 'loading'],
    getFontsFailure: ['error'],
})

export const getFontsTypes = Types
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
const getFontsRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getFontsSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getFontsFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_FONTS_REQUEST]: getFontsRequest,
    [Types.GET_FONTS_SUCCESS]: getFontsSuccess,
    [Types.GET_FONTS_FAILURE]: getFontsFailure,
})
