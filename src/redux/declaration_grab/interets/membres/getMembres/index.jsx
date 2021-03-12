import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getMembresRequest: ['response'],
    getMembresSuccess: ['response', 'loading'],
    getMembresFailure: ['error'],
})

export const getMembresTypes = Types
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
const getMembresRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getMembresSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getMembresFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_MEMBRES_REQUEST]: getMembresRequest,
    [Types.GET_MEMBRES_SUCCESS]: getMembresSuccess,
    [Types.GET_MEMBRES_FAILURE]: getMembresFailure,
})
