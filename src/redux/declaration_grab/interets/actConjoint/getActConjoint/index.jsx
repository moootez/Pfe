import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getActConjointRequest: ['response'],
    getActConjointSuccess: ['response', 'loading'],
    getActConjointFailure: ['error'],
})

export const getActConjointTypes = Types
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
const getActConjointRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getActConjointSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getActConjointFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ACT_CONJOINT_REQUEST]: getActConjointRequest,
    [Types.GET_ACT_CONJOINT_SUCCESS]: getActConjointSuccess,
    [Types.GET_ACT_CONJOINT_FAILURE]: getActConjointFailure,
})
