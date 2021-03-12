import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    addSanctionRequest: ['response'],
    addSanctionSuccess: ['response', 'loading'],
    addSanctionFailure: ['error'],
})

export const addSanctionTypes = Types
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
const addSanctionRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const addSanctionSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const addSanctionFailure = (state, { error }) => {
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
    [Types.ADD_SANCTION_REQUEST]: addSanctionRequest,
    [Types.ADD_SANCTION_SUCCESS]: addSanctionSuccess,
    [Types.ADD_SANCTION_FAILURE]: addSanctionFailure,
})
