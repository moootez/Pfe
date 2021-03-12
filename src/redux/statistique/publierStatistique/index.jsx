import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    publierStatistiqueRequest: ['response'],
    publierStatistiqueSuccess: ['response', 'loading'],
    publierStatistiqueFailure: ['error'],
})

export const publierStatistiqueTypes = Types
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
const publierStatistiqueRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const publierStatistiqueSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const publierStatistiqueFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        loading: false,
        error: true,
        response,
    })
}

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.PUBLIER_STATISTIQUE_REQUEST]: publierStatistiqueRequest,
    [Types.PUBLIER_STATISTIQUE_SUCCESS]: publierStatistiqueSuccess,
    [Types.PUBLIER_STATISTIQUE_FAILURE]: publierStatistiqueFailure,
})
