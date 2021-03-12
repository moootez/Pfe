import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getCertifRequest: ['response'],
    getCertifSuccess: ['response'],
    getCertifFailure: ['error'],
})

export const getCertifTypes = Types
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
const getCertifSuccess = (state, { response }) =>
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
const getCertifFailure = state =>
    state.merge({
        connected: false,
        loading: false,
        error: true,
        response: false,
    })
/**
 *
 * reducers action request
 *
 * @param {*} state
 * @param {*} { response }
 */
const getCertifRequest = state => state.merge({ loading: true })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_CERTIF_REQUEST]: getCertifRequest,
    [Types.GET_CERTIF_SUCCESS]: getCertifSuccess,
    [Types.GET_CERTIF_FAILURE]: getCertifFailure,
})
