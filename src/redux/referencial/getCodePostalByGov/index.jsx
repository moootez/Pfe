import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getCodePostalByGovRequest: ['response'],
    getCodePostalByGovSuccess: ['response', 'loading'],
    getCodePostalByGovFailure: ['error'],
})

export const getCodePostalByGovTypes = Types
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

const getCodePostalByGovRequest = state => state.merge({ loading: true })

const getCodePostalByGovSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

const getCodePostalByGovFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_CODE_POSTAL_BY_GOV_REQUEST]: getCodePostalByGovRequest,
    [Types.GET_CODE_POSTAL_BY_GOV_SUCCESS]: getCodePostalByGovSuccess,
    [Types.GET_CODE_POSTAL_BY_GOV_FAILURE]: getCodePostalByGovFailure,
})
