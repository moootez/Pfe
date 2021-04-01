import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    exportPdfCommandeRequest: ['response'],
    exportPdfCommandeSuccess: ['response', 'loading'],
    exportPdfCommandeFailure: ['error'],
})

export const exportPdfCommandeTypes = Types
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
const exportPdfCommandeSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const exportPdfCommandeFailure = (state, { error }) => {
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
const exportPdfCommandeRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.EXPORT_PDF_COMMANDE_REQUEST]: exportPdfCommandeRequest,
    [Types.EXPORT_PDF_COMMANDE_SUCCESS]: exportPdfCommandeSuccess,
    [Types.EXPORT_PDF_COMMANDE_FAILURE]: exportPdfCommandeFailure,
})
