import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getRapportRequest: ['response'],
    getRapportSuccess: ['response', 'loading'],
    getRapportFailure: ['error'],
})

export const getRapportTypes = Types
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
const getRapportRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getRapportSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getRapportFailure = (state, { error }) => {
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
    [Types.GET_RAPPORT_REQUEST]: getRapportRequest,
    [Types.GET_RAPPORT_SUCCESS]: getRapportSuccess,
    [Types.GET_RAPPORT_FAILURE]: getRapportFailure,
})
