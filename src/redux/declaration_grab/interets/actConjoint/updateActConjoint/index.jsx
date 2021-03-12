import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    updateActConjointRequest: ['response'],
    updateActConjointSuccess: ['response', 'loading'],
    updateActConjointFailure: ['error'],
})

export const updateActConjointTypes = Types
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
const updateActConjointRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const updateActConjointSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const updateActConjointFailure = (state, { error }) => {
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
    [Types.UPDATE_ACT_CONJOINT_REQUEST]: updateActConjointRequest,
    [Types.UPDATE_ACT_CONJOINT_SUCCESS]: updateActConjointSuccess,
    [Types.UPDATE_ACT_CONJOINT_FAILURE]: updateActConjointFailure,
})
