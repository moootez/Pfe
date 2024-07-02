import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getCommandeByClientRequest: ['response'],
    getCommandeByClientSuccess: ['response', 'loading'],
    getCommandeByClientFailure: ['error'],
})

export const getCommandeByClientTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

/**
 * reducers action success
 * @param {*} state
 */
const getCommandeByClientSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const getCommandeByClientFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const getCommandeByClientRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_COMMANDE_REQUEST]: getCommandeByClientRequest,
    [Types.GET_COMMANDE_SUCCESS]: getCommandeByClientSuccess,
    [Types.GET_COMMANDE_FAILURE]: getCommandeByClientFailure,
})
