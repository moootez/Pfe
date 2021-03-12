import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    addDeclarationAssujettiRequest: ['response'],
    addDeclarationAssujettiSuccess: ['response', 'loading'],
    addDeclarationAssujettiFailure: ['error'],
})

export const addDeclarationAssujettiTypes = Types
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
const addDeclarationAssujettiRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const addDeclarationAssujettiSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const addDeclarationAssujettiFailure = (state, { error }) => {
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
    [Types.ADD_DECLARATION_ASSUJETTI_REQUEST]: addDeclarationAssujettiRequest,
    [Types.ADD_DECLARATION_ASSUJETTI_SUCCESS]: addDeclarationAssujettiSuccess,
    [Types.ADD_DECLARATION_ASSUJETTI_FAILURE]: addDeclarationAssujettiFailure,
})
