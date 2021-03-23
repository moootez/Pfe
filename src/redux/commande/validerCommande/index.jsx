import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    validerCommandeRequest: ['response'],
    validerCommandeSuccess: ['response', 'loading'],
    validerCommandeFailure: ['error'],
})

export const validerCommandeTypes = Types
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
const validerCommandeSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const validerCommandeFailure = (state, { error }) => {
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
const validerCommandeRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.VALIDER_COMMANDE_REQUEST]: validerCommandeRequest,
    [Types.VALIDER_COMMANDE_SUCCESS]: validerCommandeSuccess,
    [Types.VALIDER_COMMANDE_FAILURE]: validerCommandeFailure,
})
