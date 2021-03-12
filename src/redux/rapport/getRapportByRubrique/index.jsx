import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getRapportByRubriqueRequest: ['response'],
    getRapportByRubriqueSuccess: ['response', 'loading'],
    getRapportByRubriqueFailure: ['error'],
})

export const getRapportByRubriqueTypes = Types
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
const getRapportByRubriqueRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getRapportByRubriqueSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getRapportByRubriqueFailure = (state, { error }) => {
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
    [Types.GET_RAPPORT_BY_RUBRIQUE_REQUEST]: getRapportByRubriqueRequest,
    [Types.GET_RAPPORT_BY_RUBRIQUE_SUCCESS]: getRapportByRubriqueSuccess,
    [Types.GET_RAPPORT_BY_RUBRIQUE_FAILURE]: getRapportByRubriqueFailure,
})
