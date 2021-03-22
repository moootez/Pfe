import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getAllCommandeRequest: ['response'],
    getAllCommandeSuccess: ['response', 'loading'],
    getAllCommandeFailure: ['error'],
})

export const getAllCommandeTypes = Types
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
const getAllCommandeRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getAllCommandeSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getAllCommandeFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ALL_COMMANDE_REQUEST]: getAllCommandeRequest,
    [Types.GET_ALL_COMMANDE_SUCCESS]: getAllCommandeSuccess,
    [Types.GET_ALL_COMMANDE_FAILURE]: getAllCommandeFailure,
})
