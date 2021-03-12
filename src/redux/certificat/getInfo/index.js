import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getInfoRequest: ['response'],
    getInfoSuccess: ['response'],
    getInfoFailure: ['error'],
})

export const getInfoTypes = Types
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
const getInfoSuccess = (state, { response }) =>
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
const getInfoFailure = state =>
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
const getInfoRequest = state => state.merge({ loading: true })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_INFO_REQUEST]: getInfoRequest,
    [Types.GET_INFO_SUCCESS]: getInfoSuccess,
    [Types.GET_INFO_FAILURE]: getInfoFailure,
})
