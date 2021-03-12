import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    addDeclarantInterneRequest: ['response'],
    addDeclarantInterneSuccess: ['response', 'loading'],
    addDeclarantInterneFailure: ['error'],
})

export const addDeclarantInterneTypes = Types
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
const addDeclarantInterneRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const addDeclarantInterneSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const addDeclarantInterneFailure = (state, { error }) => {
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
    [Types.ADD_DECLARANT_INTERNE_REQUEST]: addDeclarantInterneRequest,
    [Types.ADD_DECLARANT_INTERNE_SUCCESS]: addDeclarantInterneSuccess,
    [Types.ADD_DECLARANT_INTERNE_FAILURE]: addDeclarantInterneFailure,
})
