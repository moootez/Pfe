import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    publierEtablissementRequest: ['response'],
    publierEtablissementSuccess: ['response', 'loading'],
    publierEtablissementFailure: ['error'],
})

export const publierEtablissementTypes = Types
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
const publierEtablissementSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const publierEtablissementFailure = (state, { error }) => {
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
const publierEtablissementRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.PUBLIER_ETABLISSEMENT_REQUEST]: publierEtablissementRequest,
    [Types.PUBLIER_ETABLISSEMENT_SUCCESS]: publierEtablissementSuccess,
    [Types.PUBLIER_ETABLISSEMENT_FAILURE]: publierEtablissementFailure,
})
