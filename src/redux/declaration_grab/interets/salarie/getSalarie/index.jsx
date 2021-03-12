import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getSalarieRequest: ['response'],
    getSalarieSuccess: ['response', 'loading'],
    getSalarieFailure: ['error'],
})

export const getSalarieTypes = Types
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
const getSalarieRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getSalarieSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getSalarieFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_SALARIE_REQUEST]: getSalarieRequest,
    [Types.GET_SALARIE_SUCCESS]: getSalarieSuccess,
    [Types.GET_SALARIE_FAILURE]: getSalarieFailure,
})
