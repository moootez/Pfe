import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    validerCertifRequest: ['response'],
    validerCertifSuccess: ['response'],
    validerCertifFailure: ['error'],
})

export const validerCertifTypes = Types
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
const validerCertifSuccess = (state, { response }) =>
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
const validerCertifFailure = state =>
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
const validerCertifRequest = state => state.merge({ loading: true })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.VALIDER_CERTIF_REQUEST]: validerCertifRequest,
    [Types.VALIDER_CERTIF_SUCCESS]: validerCertifSuccess,
    [Types.VALIDER_CERTIF_FAILURE]: validerCertifFailure,
})
