import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    updateLiberaleRequest: ['response'],
    updateLiberaleSuccess: ['response', 'loading'],
    updateLiberaleFailure: ['error'],
})

export const updateLiberaleTypes = Types
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
const updateLiberaleRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const updateLiberaleSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const updateLiberaleFailure = (state, { error }) => {
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
    [Types.UPDATE_LIBERALE_REQUEST]: updateLiberaleRequest,
    [Types.UPDATE_LIBERALE_SUCCESS]: updateLiberaleSuccess,
    [Types.UPDATE_LIBERALE_FAILURE]: updateLiberaleFailure,
})
