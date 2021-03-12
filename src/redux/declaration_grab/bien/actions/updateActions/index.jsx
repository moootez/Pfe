import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    updateActionsRequest: ['response'],
    updateActionsSuccess: ['response', 'loading'],
    updateActionsFailure: ['error'],
})

export const updateActionsTypes = Types
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
const updateActionsRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const updateActionsSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const updateActionsFailure = (state, { error }) => {
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
    [Types.UPDATE_ACTIONS_REQUEST]: updateActionsRequest,
    [Types.UPDATE_ACTIONS_SUCCESS]: updateActionsSuccess,
    [Types.UPDATE_ACTIONS_FAILURE]: updateActionsFailure,
})
