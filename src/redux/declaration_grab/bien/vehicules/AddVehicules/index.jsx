import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    addVehiculesRequest: ['response'],
    addVehiculesSuccess: ['response', 'loading'],
    addVehiculesFailure: ['error'],
})

export const addVehiculesTypes = Types
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
const addVehiculesSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const addVehiculesFailure = (state, { error }) => {
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
const addVehiculesRequest = state => state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_VEHICULES_REQUEST]: addVehiculesRequest,
    [Types.ADD_VEHICULES_SUCCESS]: addVehiculesSuccess,
    [Types.ADD_VEHICULES_FAILURE]: addVehiculesFailure,
})
