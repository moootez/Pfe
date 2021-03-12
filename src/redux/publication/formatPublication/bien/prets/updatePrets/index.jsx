import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    updatePretsRequest: ['response'],
    updatePretsSuccess: ['response', 'loading'],
    updatePretsFailure: ['error'],
})

export const updatePretsTypes = Types
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
const updatePretsRequest = state => state.merge({ loading: true })

/**
 * reducers action request
 * @param {*} state
 */
const updatePretsSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action request
 * @param {*} state
 */
const updatePretsFailure = (state, { error }) => {
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
    [Types.UPDATE_PRETS_REQUEST]: updatePretsRequest,
    [Types.UPDATE_PRETS_SUCCESS]: updatePretsSuccess,
    [Types.UPDATE_PRETS_FAILURE]: updatePretsFailure,
})
