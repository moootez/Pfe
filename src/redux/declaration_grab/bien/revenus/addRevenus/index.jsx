import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    addRevenusRequest: ['response'],
    addRevenusSuccess: ['response', 'loading'],
    addRevenusFailure: ['error'],
})

export const addRevenusTypes = Types
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
const addRevenusSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const addRevenusFailure = (state, { error }) => {
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
const addRevenusRequest = state =>
    state.merge({
        loading: true,
        error: null,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_REVENUS_REQUEST]: addRevenusRequest,
    [Types.ADD_REVENUS_SUCCESS]: addRevenusSuccess,
    [Types.ADD_REVENUS_FAILURE]: addRevenusFailure,
})
