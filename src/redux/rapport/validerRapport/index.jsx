import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    validerRapportRequest: ['response'],
    validerRapportSuccess: ['response', 'loading'],
    validerRapportFailure: ['error'],
})

export const validerRapportTypes = Types
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
const validerRapportRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const validerRapportSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const validerRapportFailure = (state, { error }) => {
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
    [Types.VALIDER_RAPPORT_REQUEST]: validerRapportRequest,
    [Types.VALIDER_RAPPORT_SUCCESS]: validerRapportSuccess,
    [Types.VALIDER_RAPPORT_FAILURE]: validerRapportFailure,
})
