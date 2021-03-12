import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getCadeauxRequest: ['response'],
    getCadeauxSuccess: ['response', 'loading'],
    getCadeauxFailure: ['error'],
})

export const getCadeauxTypes = Types
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
const getCadeauxRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getCadeauxSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getCadeauxFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_CADEAUX_REQUEST]: getCadeauxRequest,
    [Types.GET_CADEAUX_SUCCESS]: getCadeauxSuccess,
    [Types.GET_CADEAUX_FAILURE]: getCadeauxFailure,
})
