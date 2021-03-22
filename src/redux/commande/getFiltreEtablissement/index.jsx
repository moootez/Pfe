import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getFilterEtablissementRequest: ['response'],
    getFilterEtablissementSuccess: ['response', 'loading'],
    getFilterEtablissementFailure: ['error'],
})

export const getFilterEtablissementTypes = Types
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
const getFilterEtablissementRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getFilterEtablissementSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getFilterEtablissementFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_FILTER_ETABLISSEMENT_REQUEST]: getFilterEtablissementRequest,
    [Types.GET_FILTER_ETABLISSEMENT_SUCCESS]: getFilterEtablissementSuccess,
    [Types.GET_FILTER_ETABLISSEMENT_FAILURE]: getFilterEtablissementFailure,
})
