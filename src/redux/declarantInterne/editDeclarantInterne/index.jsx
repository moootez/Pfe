import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    editDeclarantInterneRequest: ['response'],
    editDeclarantInterneSuccess: ['response', 'loading'],
    editDeclarantInterneFailure: ['error'],
})

export const editDeclarantInterneTypes = Types
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
const editDeclarantInterneRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const editDeclarantInterneSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const editDeclarantInterneFailure = (state, { error }) => {
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
    [Types.EDIT_DECLARANT_INTERNE_REQUEST]: editDeclarantInterneRequest,
    [Types.EDIT_DECLARANT_INTERNE_SUCCESS]: editDeclarantInterneSuccess,
    [Types.EDIT_DECLARANT_INTERNE_FAILURE]: editDeclarantInterneFailure,
})
