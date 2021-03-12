import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    isExistMatriculeRequest: ['response'],
    isExistMatriculeSuccess: ['response', 'loading'],
    isExistMatriculeFailure: ['error'],
})

export const isExistMatriculeTypes = Types
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
const isExistMatriculeRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const isExistMatriculeSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const isExistMatriculeFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.IS_EXIST_MATRICULE_REQUEST]: isExistMatriculeRequest,
    [Types.IS_EXIST_MATRICULE_SUCCESS]: isExistMatriculeSuccess,
    [Types.IS_EXIST_MATRICULE_FAILURE]: isExistMatriculeFailure,
})
