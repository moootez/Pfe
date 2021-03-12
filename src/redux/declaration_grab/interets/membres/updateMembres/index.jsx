import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    updateMembresRequest: ['response'],
    updateMembresSuccess: ['response', 'loading'],
    updateMembresFailure: ['error'],
})

export const updateMembresTypes = Types
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
const updateMembresRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const updateMembresSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const updateMembresFailure = (state, { error }) => {
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
    [Types.UPDATE_MEMBRES_REQUEST]: updateMembresRequest,
    [Types.UPDATE_MEMBRES_SUCCESS]: updateMembresSuccess,
    [Types.UPDATE_MEMBRES_FAILURE]: updateMembresFailure,
})
