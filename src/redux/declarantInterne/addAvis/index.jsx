import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    addAvisRequest: ['response'],
    addAvisSuccess: ['response', 'loading'],
    addAvisFailure: ['error'],
})

export const addAvisTypes = Types
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
const addAvisRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const addAvisSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const addAvisFailure = (state, { error }) => {
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
    [Types.ADD_AVIS_REQUEST]: addAvisRequest,
    [Types.ADD_AVIS_SUCCESS]: addAvisSuccess,
    [Types.ADD_AVIS_FAILURE]: addAvisFailure,
})
