import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    updateAnimauxRequest: ['response'],
    updateAnimauxSuccess: ['response', 'loading'],
    updateAnimauxFailure: ['error'],
})

export const updateAnimauxTypes = Types
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
const updateAnimauxRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const updateAnimauxSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const updateAnimauxFailure = (state, { error }) => {
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
    [Types.UPDATE_ANIMAUX_REQUEST]: updateAnimauxRequest,
    [Types.UPDATE_ANIMAUX_SUCCESS]: updateAnimauxSuccess,
    [Types.UPDATE_ANIMAUX_FAILURE]: updateAnimauxFailure,
})
