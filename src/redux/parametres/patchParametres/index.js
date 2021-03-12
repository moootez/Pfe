import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    patchParametresRequest: ['response'],
    patchParametresSuccess: ['response'],
    patchParametresFailure: ['error'],
})

export const patchParametresTypes = Types
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
const patchParametresSuccess = (state, { response }) =>
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
const patchParametresFailure = state =>
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
const patchParametresRequest = state => state.merge({ loading: true })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.PATCH_PARAMETRES_REQUEST]: patchParametresRequest,
    [Types.PATCH_PARAMETRES_SUCCESS]: patchParametresSuccess,
    [Types.PATCH_PARAMETRES_FAILURE]: patchParametresFailure,
})
