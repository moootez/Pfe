import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    updateEnfantRequest: ['response'],
    updateEnfantSuccess: ['response', 'loading'],
    updateEnfantFailure: ['error'],
})

export const updateEnfantTypes = Types
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
const updateEnfantRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const updateEnfantSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const updateEnfantFailure = (state, { error }) => {
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
    [Types.UPDATE_ENFANT_REQUEST]: updateEnfantRequest,
    [Types.UPDATE_ENFANT_SUCCESS]: updateEnfantSuccess,
    [Types.UPDATE_ENFANT_FAILURE]: updateEnfantFailure,
})
