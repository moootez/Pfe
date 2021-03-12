import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    updateAssurancesRequest: ['response'],
    updateAssurancesSuccess: ['response', 'loading'],
    updateAssurancesFailure: ['error'],
})

export const updateAssurancesTypes = Types
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
const updateAssurancesRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const updateAssurancesSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const updateAssurancesFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.UPDATE_ASSURANCES_REQUEST]: updateAssurancesRequest,
    [Types.UPDATE_ASSURANCES_SUCCESS]: updateAssurancesSuccess,
    [Types.UPDATE_ASSURANCES_FAILURE]: updateAssurancesFailure,
})
