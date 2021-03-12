import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    updateCadeauxRequest: ['response'],
    updateCadeauxSuccess: ['response', 'loading'],
    updateCadeauxFailure: ['error'],
})

export const updateCadeauxTypes = Types
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
const updateCadeauxRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const updateCadeauxSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const updateCadeauxFailure = (state, { error }) => {
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
    [Types.UPDATE_CADEAUX_REQUEST]: updateCadeauxRequest,
    [Types.UPDATE_CADEAUX_SUCCESS]: updateCadeauxSuccess,
    [Types.UPDATE_CADEAUX_FAILURE]: updateCadeauxFailure,
})
