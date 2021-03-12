import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    addFontsRequest: ['response'],
    addFontsSuccess: ['response', 'loading'],
    addFontsFailure: ['error'],
})

export const addFontsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

/**
 * reducers action success
 * @param {*} state
 */
const addFontsSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const addFontsFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        loading: false,
        error: true,
        response,
    })
}
/**
 * reducers action request
 * @param {*} state
 */
const addFontsRequest = state => state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_FONTS_REQUEST]: addFontsRequest,
    [Types.ADD_FONTS_SUCCESS]: addFontsSuccess,
    [Types.ADD_FONTS_FAILURE]: addFontsFailure,
})
