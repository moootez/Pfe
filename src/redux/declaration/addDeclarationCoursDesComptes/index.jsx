import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    addDeclarationCoursDesComptesRequest: ['response'],
    addDeclarationCoursDesComptesSuccess: ['response', 'loading'],
    addDeclarationCoursDesComptesFailure: ['error'],
})

export const addDeclarationCoursDesComptesTypes = Types
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

/**
 * reducers action request
 * @param {*} state
 */
const addDeclarationCoursDesComptesRequest = state =>
    state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const addDeclarationCoursDesComptesSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const addDeclarationCoursDesComptesFailure = (state, { error }) => {
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
    [Types.ADD_DECLARATION_COURS_DES_COMPTES_REQUEST]: addDeclarationCoursDesComptesRequest,
    [Types.ADD_DECLARATION_COURS_DES_COMPTES_SUCCESS]: addDeclarationCoursDesComptesSuccess,
    [Types.ADD_DECLARATION_COURS_DES_COMPTES_FAILURE]: addDeclarationCoursDesComptesFailure,
})
