import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    editSanctionRequest: ['response'],
    editSanctionSuccess: ['response', 'loading'],
    editSanctionFailure: ['error'],
})

export const editSanctionTypes = Types
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
const editSanctionRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const editSanctionSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const editSanctionFailure = (state, { error }) => {
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
    [Types.EDIT_SANCTION_REQUEST]: editSanctionRequest,
    [Types.EDIT_SANCTION_SUCCESS]: editSanctionSuccess,
    [Types.EDIT_SANCTION_FAILURE]: editSanctionFailure,
})
