import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    updateSalarieRequest: ['response'],
    updateSalarieSuccess: ['response', 'loading'],
    updateSalarieFailure: ['error'],
})

export const updateSalarieTypes = Types
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
const updateSalarieRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const updateSalarieSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const updateSalarieFailure = (state, { error }) => {
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
    [Types.UPDATE_SALARIE_REQUEST]: updateSalarieRequest,
    [Types.UPDATE_SALARIE_SUCCESS]: updateSalarieSuccess,
    [Types.UPDATE_SALARIE_FAILURE]: updateSalarieFailure,
})
