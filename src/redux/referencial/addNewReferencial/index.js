import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    addNewReferenceRequest: ['response'],
    addNewReferenceSuccess: ['response', 'loading'],
    addNewReferenceFailure: ['error', 'categorie'],
})

export const addNewReferenceTypes = Types
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

const addNewReferenceRequest = state => state.merge({ loading: true })

/**
 * reducers action sucess
 *
 * @param {*} state
 */
const addNewReferenceSuccess = (state, { response }) =>
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
const addNewReferenceFailure = (state, { error, categorie }) => {
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
    [Types.ADD_NEW_REFERENCE_REQUEST]: addNewReferenceRequest,
    [Types.ADD_NEW_REFERENCE_SUCCESS]: addNewReferenceSuccess,
    [Types.ADD_NEW_REFERENCE_FAILURE]: addNewReferenceFailure,
})
