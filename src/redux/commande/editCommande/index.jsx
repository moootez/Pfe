import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    editCommandeRequest: ['response'],
    editCommandeSuccess: ['response', 'loading'],
    editCommandeFailure: ['error'],
})

export const editCommandeTypes = Types
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
const editCommandeSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const editCommandeFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        loading: false,
        error: true,
        response,
    })
}

/**
 * reducers action request
 * @param {*} state
 */
const editCommandeRequest = state => state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.EDIT_COMMANDE_REQUEST]: editCommandeRequest,
    [Types.EDIT_COMMANDE_SUCCESS]: editCommandeSuccess,
    [Types.EDIT_COMMANDE_FAILURE]: editCommandeFailure,
})
