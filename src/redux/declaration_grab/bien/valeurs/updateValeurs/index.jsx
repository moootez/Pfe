import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    updateValeursRequest: ['response'],
    updateValeursSuccess: ['response', 'loading'],
    updateValeursFailure: ['error'],
})

export const updateValeursTypes = Types
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
const updateValeursRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const updateValeursSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const updateValeursFailure = (state, { error }) => {
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
    [Types.UPDATE_VALEURS_REQUEST]: updateValeursRequest,
    [Types.UPDATE_VALEURS_SUCCESS]: updateValeursSuccess,
    [Types.UPDATE_VALEURS_FAILURE]: updateValeursFailure,
})
