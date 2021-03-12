import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    publierDeclarantRequest: ['response'],
    publierDeclarantSuccess: ['response', 'loading'],
    publierDeclarantFailure: ['error'],
})

export const publierDeclarantTypes = Types
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
const publierDeclarantRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const publierDeclarantSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const publierDeclarantFailure = (state, { error }) => {
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
    [Types.PUBLIER_DECLARANT_REQUEST]: publierDeclarantRequest,
    [Types.PUBLIER_DECLARANT_SUCCESS]: publierDeclarantSuccess,
    [Types.PUBLIER_DECLARANT_FAILURE]: publierDeclarantFailure,
})
