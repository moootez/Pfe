import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getReceivedRequest: ['response'],
    getReceivedSuccess: ['response', 'loading'],
    getReceivedFailure: ['error'],
})
export const getReceivedTypes = Types
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
const getReceivedRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getReceivedSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getReceivedFailure = (state, { error }) => {
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
    [Types.GET_RECEIVED_REQUEST]: getReceivedRequest,
    [Types.GET_RECEIVED_SUCCESS]: getReceivedSuccess,
    [Types.GET_RECEIVED_FAILURE]: getReceivedFailure,
})
