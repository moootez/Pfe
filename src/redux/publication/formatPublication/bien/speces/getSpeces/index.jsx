import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getSpecesRequest: ['response'],
    getSpecesSuccess: ['response', 'loading'],
    getSpecesFailure: ['error'],
})

export const getSpecesTypes = Types
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
const getSpecesRequest = state => state.merge({ loading: true })

/**
 * reducers action request
 * @param {*} state
 */
const getSpecesSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action request
 * @param {*} state
 */
const getSpecesFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_SPECES_REQUEST]: getSpecesRequest,
    [Types.GET_SPECES_SUCCESS]: getSpecesSuccess,
    [Types.GET_SPECES_FAILURE]: getSpecesFailure,
})
