import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getReceivedRecuRequest: ['response'],
    getReceivedRecuSuccess: ['response', 'loading'],
    getReceivedRecuFailure: ['error'],
})
export const getReceivedRecuTypes = Types
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
const getReceivedRecuRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getReceivedRecuSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getReceivedRecuFailure = (state, { error }) => {
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
    [Types.GET_RECEIVED_RECU_REQUEST]: getReceivedRecuRequest,
    [Types.GET_RECEIVED_RECU_SUCCESS]: getReceivedRecuSuccess,
    [Types.GET_RECEIVED_RECU_FAILURE]: getReceivedRecuFailure,
})
