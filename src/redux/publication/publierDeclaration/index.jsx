import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    publierDeclarationRequest: ['response'],
    publierDeclarationSuccess: ['response', 'loading'],
    publierDeclarationFailure: ['error'],
})

export const publierDeclarationTypes = Types
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
const publierDeclarationRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const publierDeclarationSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const publierDeclarationFailure = (state, { error }) => {
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
    [Types.PUBLIER_DECLARATION_REQUEST]: publierDeclarationRequest,
    [Types.PUBLIER_DECLARATION_SUCCESS]: publierDeclarationSuccess,
    [Types.PUBLIER_DECLARATION_FAILURE]: publierDeclarationFailure,
})
