import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getAllReferenceRequest: ['response'],
    getAllReferenceSuccess: ['response', 'loading'],
    getAllReferenceFailure: ['error'],
    getReferenceByPaginationRequest: [
        'page',
        'limit',
        'categorie',
        'intituleFr',
        'intituleAr',
    ],
    getReferenceByPaginationSuccess: ['filtredResponse'],
    getReferenceByPaginationFailure: ['error'],
    changeSelectedReferencial: ['selectedRef'],
})

export const getAllReferenceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
    page: 1,
    limit: 5,
    filtredResponse: null,
    categorie: null,
    intitulFr: null,
    intitulAr: null,
    selectedRef: 'RefBanque',
})

/* ------------- Reducers ------------- */
/**
 * reducers action request
 *
 * @param {*} state
 */
const getReferenceByPaginationRequest = (
    state,
    { page, limit, categorie, intituleFr, intituleAr }
) =>
    state.merge({
        error: false,
        page,
        loading: true,
        limit,
        categorie,
        intitulFr: intituleFr,
        intitulAr: intituleAr,
    })
/**
 * reducers action sucess
 *
 * @param {*} state
 */
const getReferenceByPaginationSuccess = (state, { filtredResponse }) =>
    state.merge({
        error: false,
        loading: false,
        filtredResponse,
    })
const getAllReferenceSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
const getAllReferenceFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
const getAllReferenceRequest = state =>
    state.merge({ loading: true, error: null })
const getReferenceByPaginationFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
const changeSelectedReferencial = (state, { selectedRef }) =>
    state.merge({ selectedRef })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ALL_REFERENCE_REQUEST]: getAllReferenceRequest,
    [Types.GET_ALL_REFERENCE_SUCCESS]: getAllReferenceSuccess,
    [Types.GET_ALL_REFERENCE_FAILURE]: getAllReferenceFailure,
    [Types.GET_REFERENCE_BY_PAGINATION_REQUEST]: getReferenceByPaginationRequest,
    [Types.GET_REFERENCE_BY_PAGINATION_SUCCESS]: getReferenceByPaginationSuccess,
    [Types.GET_REFERENCE_BY_PAGINATION_FAILURE]: getReferenceByPaginationFailure,
    [Types.CHANGE_SELECTED_REFERENCIAL]: changeSelectedReferencial,
})
