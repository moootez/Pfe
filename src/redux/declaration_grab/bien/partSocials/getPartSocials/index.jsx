import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getPartSocialsRequest: ['response'],
    getPartSocialsSuccess: ['response', 'loading'],
    getPartSocialsFailure: ['error'],
})

export const getPartSocialsTypes = Types
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
const getPartSocialsRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getPartSocialsSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getPartSocialsFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_PART_SOCIALS_REQUEST]: getPartSocialsRequest,
    [Types.GET_PART_SOCIALS_SUCCESS]: getPartSocialsSuccess,
    [Types.GET_PART_SOCIALS_FAILURE]: getPartSocialsFailure,
})
