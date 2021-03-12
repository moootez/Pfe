import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getAssurancesRequest: ['response'],
    getAssurancesSuccess: ['response', 'loading'],
    getAssurancesFailure: ['error'],
})

export const getAssurancesTypes = Types
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
const getAssurancesRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getAssurancesSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getAssurancesFailure = (state, { error }) => {
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
    [Types.GET_ASSURANCES_REQUEST]: getAssurancesRequest,
    [Types.GET_ASSURANCES_SUCCESS]: getAssurancesSuccess,
    [Types.GET_ASSURANCES_FAILURE]: getAssurancesFailure,
})
