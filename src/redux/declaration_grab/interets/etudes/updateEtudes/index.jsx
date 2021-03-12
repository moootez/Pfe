import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    updateEtudesRequest: ['response'],
    updateEtudesSuccess: ['response', 'loading'],
    updateEtudesFailure: ['error'],
})

export const updateEtudesTypes = Types
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
const updateEtudesRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const updateEtudesSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const updateEtudesFailure = (state, { error }) => {
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
    [Types.UPDATE_ETUDES_REQUEST]: updateEtudesRequest,
    [Types.UPDATE_ETUDES_SUCCESS]: updateEtudesSuccess,
    [Types.UPDATE_ETUDES_FAILURE]: updateEtudesFailure,
})
