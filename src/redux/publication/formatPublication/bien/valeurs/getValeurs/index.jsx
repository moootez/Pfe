import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getValeursRequest: ['response'],
    getValeursSuccess: ['response', 'loading'],
    getValeursFailure: ['error'],
})

export const getValeursTypes = Types
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
const getValeursRequest = state => state.merge({ loading: true })

/**
 * reducers action request
 * @param {*} state
 */
const getValeursSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action request
 * @param {*} state
 */
const getValeursFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_VALEURS_REQUEST]: getValeursRequest,
    [Types.GET_VALEURS_SUCCESS]: getValeursSuccess,
    [Types.GET_VALEURS_FAILURE]: getValeursFailure,
})
