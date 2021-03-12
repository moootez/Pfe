import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    addAnimauxRequest: ['response'],
    addAnimauxSuccess: ['response', 'loading'],
    addAnimauxFailure: ['error'],
})

export const addAnimauxTypes = Types
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
const addAnimauxSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const addAnimauxFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        loading: false,
        error: true,
        response,
    })
}
/**
 * reducers action request
 * @param {*} state
 */
const addAnimauxRequest = state => state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_ANIMAUX_REQUEST]: addAnimauxRequest,
    [Types.ADD_ANIMAUX_SUCCESS]: addAnimauxSuccess,
    [Types.ADD_ANIMAUX_FAILURE]: addAnimauxFailure,
})
