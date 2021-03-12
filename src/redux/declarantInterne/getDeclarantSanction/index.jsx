import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getDeclarantSanctionRequest: ['response'],
    getDeclarantSanctionSuccess: ['response', 'loading'],
    getDeclarantSanctionFailure: ['error'],
})

export const getDeclarantSanctionTypes = Types
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
const getDeclarantSanctionSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const getDeclarantSanctionFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const getDeclarantSanctionRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_DECLARANT_SANCTION_REQUEST]: getDeclarantSanctionRequest,
    [Types.GET_DECLARANT_SANCTION_SUCCESS]: getDeclarantSanctionSuccess,
    [Types.GET_DECLARANT_SANCTION_FAILURE]: getDeclarantSanctionFailure,
})
