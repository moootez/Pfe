import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getEtudesRequest: ['response'],
    getEtudesSuccess: ['response', 'loading'],
    getEtudesFailure: ['error'],
})

export const getEtudesTypes = Types
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
const getEtudesRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getEtudesSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getEtudesFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ETUDES_REQUEST]: getEtudesRequest,
    [Types.GET_ETUDES_SUCCESS]: getEtudesSuccess,
    [Types.GET_ETUDES_FAILURE]: getEtudesFailure,
})
