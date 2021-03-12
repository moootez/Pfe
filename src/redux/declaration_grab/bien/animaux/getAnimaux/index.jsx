import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getAnimauxRequest: ['response'],
    getAnimauxSuccess: ['response', 'loading'],
    getAnimauxFailure: ['error'],
})

export const getAnimauxTypes = Types
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
const getAnimauxRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getAnimauxSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getAnimauxFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ANIMAUX_REQUEST]: getAnimauxRequest,
    [Types.GET_ANIMAUX_SUCCESS]: getAnimauxSuccess,
    [Types.GET_ANIMAUX_FAILURE]: getAnimauxFailure,
})
