import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getAllProductRequest: ['response'],
    getAllProductSuccess: ['response', 'loading'],
    getAllProductFailure: ['error'],
})

export const getAllProductTypes = Types
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
const getAllProductRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getAllProductSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getAllProductFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ALL_PRODUCT_REQUEST]: getAllProductRequest,
    [Types.GET_ALL_PRODUCT_SUCCESS]: getAllProductSuccess,
    [Types.GET_ALL_PRODUCT_FAILURE]: getAllProductFailure,
})
