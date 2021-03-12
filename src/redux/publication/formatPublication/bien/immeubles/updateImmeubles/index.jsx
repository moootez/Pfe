import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    updateImmeublesRequest: ['response'],
    updateImmeublesSuccess: ['response', 'loading'],
    updateImmeublesFailure: ['error'],
})

export const updateImmeublesTypes = Types
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
const updateImmeublesRequest = state => state.merge({ loading: true })

/**
 * reducers action request
 * @param {*} state
 */
const updateImmeublesSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action request
 * @param {*} state
 */
const updateImmeublesFailure = (state, { error }) => {
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
    [Types.UPDATE_IMMEUBLES_REQUEST]: updateImmeublesRequest,
    [Types.UPDATE_IMMEUBLES_SUCCESS]: updateImmeublesSuccess,
    [Types.UPDATE_IMMEUBLES_FAILURE]: updateImmeublesFailure,
})
