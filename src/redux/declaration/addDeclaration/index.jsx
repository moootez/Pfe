import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    addDeclarationRequest: ['response'],
    addDeclarationSuccess: ['response', 'loading'],
    addDeclarationFailure: ['error'],
})

export const addDeclarationTypes = Types
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
const addDeclarationRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const addDeclarationSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const addDeclarationFailure = (state, { error }) => {
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
    [Types.ADD_DECLARATION_REQUEST]: addDeclarationRequest,
    [Types.ADD_DECLARATION_SUCCESS]: addDeclarationSuccess,
    [Types.ADD_DECLARATION_FAILURE]: addDeclarationFailure,
})
