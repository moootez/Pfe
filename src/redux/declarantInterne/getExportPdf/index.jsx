import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getExportPdfRequest: ['response'],
    getExportPdfSuccess: ['response', 'loading'],
    getExportPdfFailure: ['error'],
})
export const getExportPdfTypes = Types
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
const getExportPdfRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getExportPdfSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getExportPdfFailure = (state, { error }) => {
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
    [Types.GET_EXPORT_PDF_REQUEST]: getExportPdfRequest,
    [Types.GET_EXPORT_PDF_SUCCESS]: getExportPdfSuccess,
    [Types.GET_EXPORT_PDF_FAILURE]: getExportPdfFailure,
})
