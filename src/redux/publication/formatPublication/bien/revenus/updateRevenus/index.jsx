import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    updateRevenusRequest: ['response'],
    updateRevenusSuccess: ['response', 'loading'],
    updateRevenusFailure: ['error'],
})

export const updateRevenusTypes = Types
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
const updateRevenusRequest = state => state.merge({ loading: true })

/**
 * reducers action request
 * @param {*} state
 */
const updateRevenusSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action request
 * @param {*} state
 */
const updateRevenusFailure = (state, { error }) => {
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
    [Types.UPDATE_REVENUS_REQUEST]: updateRevenusRequest,
    [Types.UPDATE_REVENUS_SUCCESS]: updateRevenusSuccess,
    [Types.UPDATE_REVENUS_FAILURE]: updateRevenusFailure,
})
