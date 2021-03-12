import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getResponsableRevenusRequest: ['response'],
    getResponsableRevenusSuccess: ['response', 'loading'],
    getResponsableRevenusFailure: ['error'],
})

export const getResponsableRevenusTypes = Types
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
const getResponsableRevenusSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const getResponsableRevenusFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const getResponsableRevenusRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_RESPONSABLE_REVENUS_REQUEST]: getResponsableRevenusRequest,
    [Types.GET_RESPONSABLE_REVENUS_SUCCESS]: getResponsableRevenusSuccess,
    [Types.GET_RESPONSABLE_REVENUS_FAILURE]: getResponsableRevenusFailure,
})
