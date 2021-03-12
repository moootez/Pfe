import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getExportExcelRequest: ['response'],
    getExportExcelSuccess: ['response', 'loading'],
    getExportExcelFailure: ['error'],
})
export const getExportExcelTypes = Types
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
const getExportExcelRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getExportExcelSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getExportExcelFailure = (state, { error }) => {
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
    [Types.GET_EXPORT_EXCEL_REQUEST]: getExportExcelRequest,
    [Types.GET_EXPORT_EXCEL_SUCCESS]: getExportExcelSuccess,
    [Types.GET_EXPORT_EXCEL_FAILURE]: getExportExcelFailure,
})
