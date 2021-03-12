import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getAllRapportRequest: ['response'],
    getAllRapportSuccess: ['response', 'loading'],
    getAllRapportFailure: ['error'],
})

export const getAllRapportTypes = Types
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
const getAllRapportRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getAllRapportSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getAllRapportFailure = (state, { error }) => {
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
    [Types.GET_ALL_RAPPORT_REQUEST]: getAllRapportRequest,
    [Types.GET_ALL_RAPPORT_SUCCESS]: getAllRapportSuccess,
    [Types.GET_ALL_RAPPORT_FAILURE]: getAllRapportFailure,
})
