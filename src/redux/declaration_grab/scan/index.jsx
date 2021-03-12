import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    scanDecRequest: ['response'],
    scanDecSuccess: ['response', 'loading'],
    scanDecFailure: ['error'],
})

export const scanDecTypes = Types
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
const scanDecSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const scanDecFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const scanDecRequest = state => state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.SCAN_DEC_REQUEST]: scanDecRequest,
    [Types.SCAN_DEC_SUCCESS]: scanDecSuccess,
    [Types.SCAN_DEC_FAILURE]: scanDecFailure,
})
