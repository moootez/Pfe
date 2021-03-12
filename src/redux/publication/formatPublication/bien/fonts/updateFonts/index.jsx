import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    updateFontsRequest: ['response'],
    updateFontsSuccess: ['response', 'loading'],
    updateFontsFailure: ['error'],
})

export const updateFontsTypes = Types
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
const updateFontsRequest = state => state.merge({ loading: true })

/**
 * reducers action request
 * @param {*} state
 */
const updateFontsSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action request
 * @param {*} state
 */
const updateFontsFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        loading: false,
        error: true,
        response,
    })
}

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.UPDATE_FONTS_REQUEST]: updateFontsRequest,
    [Types.UPDATE_FONTS_SUCCESS]: updateFontsSuccess,
    [Types.UPDATE_FONTS_FAILURE]: updateFontsFailure,
})
