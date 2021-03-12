import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    editAvisRequest: ['response'],
    editAvisSuccess: ['response', 'loading'],
    editAvisFailure: ['error'],
})

export const editAvisTypes = Types
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
const editAvisRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const editAvisSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const editAvisFailure = (state, { error }) => {
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
    [Types.EDIT_AVIS_REQUEST]: editAvisRequest,
    [Types.EDIT_AVIS_SUCCESS]: editAvisSuccess,
    [Types.EDIT_AVIS_FAILURE]: editAvisFailure,
})
