import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    addPretsRequest: ['response'],
    addPretsSuccess: ['response', 'loading'],
    addPretsFailure: ['error'],
})

export const addPretsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

/**
 * reducers action success
 * @param {*} state
 */
const addPretsSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const addPretsFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        loading: false,
        error: true,
        response,
    })
}
/**
 * reducers action request
 * @param {*} state
 */
const addPretsRequest = state => state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_PRETS_REQUEST]: addPretsRequest,
    [Types.ADD_PRETS_SUCCESS]: addPretsSuccess,
    [Types.ADD_PRETS_FAILURE]: addPretsFailure,
})
