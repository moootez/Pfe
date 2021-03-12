import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getFilterEtablissementAssujettiRequest: ['response'],
    getFilterEtablissementAssujettiSuccess: ['response', 'loading'],
    getFilterEtablissementAssujettiFailure: ['error'],
})

export const getFilterEtablissementAssujettiTypes = Types
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
const getFilterEtablissementAssujettiRequest = state =>
    state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getFilterEtablissementAssujettiSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getFilterEtablissementAssujettiFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_FILTER_ETABLISSEMENT_ASSUJETTI_REQUEST]: getFilterEtablissementAssujettiRequest,
    [Types.GET_FILTER_ETABLISSEMENT_ASSUJETTI_SUCCESS]: getFilterEtablissementAssujettiSuccess,
    [Types.GET_FILTER_ETABLISSEMENT_ASSUJETTI_FAILURE]: getFilterEtablissementAssujettiFailure,
})
