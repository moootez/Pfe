import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getCommandeRequest: ['response'],
    getCommandeSuccess: ['response', 'loading'],
    getCommandeFailure: ['error'],
})

export const getCommandeTypes = Types
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
const getCommandeRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getCommandeSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getCommandeFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_COMMANDE_REQUEST]: getCommandeRequest,
    [Types.GET_COMMANDE_SUCCESS]: getCommandeSuccess,
    [Types.GET_COMMANDE_FAILURE]: getCommandeFailure,
})
