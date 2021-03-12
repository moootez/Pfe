import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    updateConjointRequest: ['response'],
    updateConjointSuccess: ['response', 'loading'],
    updateConjointFailure: ['error'],
})

export const updateConjointTypes = Types
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
const updateConjointRequest = state => state.merge({ loading: true })

/**
 * reducers action request
 * @param {*} state
 */
const updateConjointSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action request
 * @param {*} state
 */
const updateConjointFailure = (state, { error }) => {
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
    [Types.UPDATE_CONJOINT_REQUEST]: updateConjointRequest,
    [Types.UPDATE_CONJOINT_SUCCESS]: updateConjointSuccess,
    [Types.UPDATE_CONJOINT_FAILURE]: updateConjointFailure,
})
