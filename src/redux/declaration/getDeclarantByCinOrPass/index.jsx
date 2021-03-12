import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getDeclarantByCinOrPassRequest: ['response'],
    getDeclarantByCinOrPassSuccess: ['response', 'loading'],
    getDeclarantByCinOrPassFailure: ['error'],
})
export const getDeclarantByCinOrPassTypes = Types
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
const getDeclarantByCinOrPassRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getDeclarantByCinOrPassSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getDeclarantByCinOrPassFailure = (state, { error }) => {
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
    [Types.GET_DECLARANT_BY_CIN_OR_PASS_REQUEST]: getDeclarantByCinOrPassRequest,
    [Types.GET_DECLARANT_BY_CIN_OR_PASS_SUCCESS]: getDeclarantByCinOrPassSuccess,
    [Types.GET_DECLARANT_BY_CIN_OR_PASS_FAILURE]: getDeclarantByCinOrPassFailure,
})
