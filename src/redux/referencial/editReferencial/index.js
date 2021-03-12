import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    editReferenceRequest: ['response'],
    editReferenceSuccess: ['loading', 'response'],
    editReferenceFailure: ['error', 'categorie'],
})

export const editReferenceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
    categorie: null,
})

/* ------------- Reducers ------------- */
/**
 * reducers action request
 *
 * @param {*} state
 */

const editReferenceRequest = state => state.merge({ loading: true })

/**
 * reducers action sucess
 *
 * @param {*} state
 */
const editReferenceSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })
/**
 * reducers action failure
 *
 * @param {*} state
 * @param {*} { error }
 * @returns
 */
const editReferenceFailure = (state, { error, categorie }) => {
    const { response } = error
    return state.merge({
        loading: false,
        error: true,
        response,
        categorie,
    })
}

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.EDIT_REFERENCE_REQUEST]: editReferenceRequest,
    [Types.EDIT_REFERENCE_SUCCESS]: editReferenceSuccess,
    [Types.EDIT_REFERENCE_FAILURE]: editReferenceFailure,
})
