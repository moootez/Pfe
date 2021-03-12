import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    updatePartSocialsRequest: ['response'],
    updatePartSocialsSuccess: ['response', 'loading'],
    updatePartSocialsFailure: ['error'],
})

export const updatePartSocialsTypes = Types
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
const updatePartSocialsRequest = state => state.merge({ loading: true })

/**
 * reducers action request
 * @param {*} state
 */
const updatePartSocialsSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action request
 * @param {*} state
 */
const updatePartSocialsFailure = (state, { error }) => {
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
    [Types.UPDATE_PART_SOCIALS_REQUEST]: updatePartSocialsRequest,
    [Types.UPDATE_PART_SOCIALS_SUCCESS]: updatePartSocialsSuccess,
    [Types.UPDATE_PART_SOCIALS_FAILURE]: updatePartSocialsFailure,
})
