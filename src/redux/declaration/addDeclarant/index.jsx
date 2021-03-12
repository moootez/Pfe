import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    addDeclarantRequest: ['response'],
    addDeclarantSuccess: ['response', 'loading'],
    addDeclarantFailure: ['error'],
})

export const addDeclarantTypes = Types
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
const addDeclarantRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const addDeclarantSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const addDeclarantFailure = (state, { error }) => {
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
    [Types.ADD_DECLARANT_REQUEST]: addDeclarantRequest,
    [Types.ADD_DECLARANT_SUCCESS]: addDeclarantSuccess,
    [Types.ADD_DECLARANT_FAILURE]: addDeclarantFailure,
})
