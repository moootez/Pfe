import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    updateVehiculesRequest: ['response'],
    updateVehiculesSuccess: ['response', 'loading'],
    updateVehiculesFailure: ['error'],
})

export const updateVehiculesTypes = Types
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
const updateVehiculesRequest = state => state.merge({ loading: true })

/**
 * reducers action request
 * @param {*} state
 */
const updateVehiculesSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action request
 * @param {*} state
 */
const updateVehiculesFailure = (state, { error }) => {
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
    [Types.UPDATE_VEHICULES_REQUEST]: updateVehiculesRequest,
    [Types.UPDATE_VEHICULES_SUCCESS]: updateVehiculesSuccess,
    [Types.UPDATE_VEHICULES_FAILURE]: updateVehiculesFailure,
})
