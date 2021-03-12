import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getObjSpeciauxRequest: ['response'],
    getObjSpeciauxSuccess: ['response', 'loading'],
    getObjSpeciauxFailure: ['error'],
})

export const getObjSpeciauxTypes = Types
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
const getObjSpeciauxRequest = state => state.merge({ loading: true })

/**
 * reducers action request
 * @param {*} state
 */
const getObjSpeciauxSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action request
 * @param {*} state
 */
const getObjSpeciauxFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_OBJ_SPECIAUX_REQUEST]: getObjSpeciauxRequest,
    [Types.GET_OBJ_SPECIAUX_SUCCESS]: getObjSpeciauxSuccess,
    [Types.GET_OBJ_SPECIAUX_FAILURE]: getObjSpeciauxFailure,
})
