import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getParametresRequest: ['response'],
    getParametresSuccess: ['response'],
    getParametresFailure: ['error'],
})

export const getParametresTypes = Types
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
 * reducers action sucess
 *
 * @param {*} state
 */
const getParametresSuccess = (state, { response }) =>
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
const getParametresFailure = state =>
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
const getParametresRequest = state => state.merge({ loading: true })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_PARAMETRES_REQUEST]: getParametresRequest,
    [Types.GET_PARAMETRES_SUCCESS]: getParametresSuccess,
    [Types.GET_PARAMETRES_FAILURE]: getParametresFailure,
})
