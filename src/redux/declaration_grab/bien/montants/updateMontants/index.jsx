import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    updateMontantsRequest: ['response'],
    updateMontantsSuccess: ['response', 'loading'],
    updateMontantsFailure: ['error'],
})

export const updateMontantsTypes = Types
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
const updateMontantsRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const updateMontantsSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const updateMontantsFailure = (state, { error }) => {
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
    [Types.UPDATE_MONTANTS_REQUEST]: updateMontantsRequest,
    [Types.UPDATE_MONTANTS_SUCCESS]: updateMontantsSuccess,
    [Types.UPDATE_MONTANTS_FAILURE]: updateMontantsFailure,
})
