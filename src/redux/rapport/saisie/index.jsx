import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    addRapportRequest: ['response'],
    addRapportSuccess: ['response', 'loading'],
    addRapportFailure: ['error'],
})

export const addRapportTypes = Types
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
const addRapportRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const addRapportSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const addRapportFailure = (state, { error }) => {
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
    [Types.ADD_RAPPORT_REQUEST]: addRapportRequest,
    [Types.ADD_RAPPORT_SUCCESS]: addRapportSuccess,
    [Types.ADD_RAPPORT_FAILURE]: addRapportFailure,
})
