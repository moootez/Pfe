import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getReceivedAvisRequest: ['response'],
    getReceivedAvisSuccess: ['response', 'loading'],
    getReceivedAvisFailure: ['error'],
})
export const getReceivedAvisTypes = Types
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
const getReceivedAvisRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getReceivedAvisSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getReceivedAvisFailure = (state, { error }) => {
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
    [Types.GET_RECEIVED_AVIS_REQUEST]: getReceivedAvisRequest,
    [Types.GET_RECEIVED_AVIS_SUCCESS]: getReceivedAvisSuccess,
    [Types.GET_RECEIVED_AVIS_FAILURE]: getReceivedAvisFailure,
})
