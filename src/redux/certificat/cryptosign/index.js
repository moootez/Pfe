import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    cryptosignRequest: ['response'],
    cryptosignSuccess: ['response'],
    cryptosignFailure: ['error'],
})

export const cryptosignTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
    connected: false,
})

/* ------------- Reducers ------------- */

/**
 *
 * reducers action sucess
 *
 * @param {*} state
 * @param {*} { response }
 */
const cryptosignSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
        connected: true,
    })
/**
 * reducers action failure
 *
 * @param {*} state
 * @param {*} { error }
 * @returns
 */
const cryptosignFailure = state =>
    state.merge({
        connected: false,
        loading: false,
        error: true,
        response: false,
    })

/**
 * reducers action request
 *
 * @param {*} state
 */
const cryptosignRequest = state => state.merge({ loading: true })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.CRYPTOSIGN_REQUEST]: cryptosignRequest,
    [Types.CRYPTOSIGN_SUCCESS]: cryptosignSuccess,
    [Types.CRYPTOSIGN_FAILURE]: cryptosignFailure,
})
