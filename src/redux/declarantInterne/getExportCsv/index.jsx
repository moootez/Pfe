import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getExportCsvRequest: ['response'],
    getExportCsvSuccess: ['response', 'loading'],
    getExportCsvFailure: ['error'],
})
export const getExportCsvTypes = Types
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
const getExportCsvRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getExportCsvSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getExportCsvFailure = (state, { error }) => {
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
    [Types.GET_EXPORT_CSV_REQUEST]: getExportCsvRequest,
    [Types.GET_EXPORT_CSV_SUCCESS]: getExportCsvSuccess,
    [Types.GET_EXPORT_CSV_FAILURE]: getExportCsvFailure,
})
