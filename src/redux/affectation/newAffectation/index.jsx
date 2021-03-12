import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */
const { Types, Creators } = createActions({
    newAffectationRequest: ['response'],
    newAffectationSuccess: ['response', 'loading'],
    newAffectationFailure: ['error'],
})

export const newAffectationTypes = Types
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
 *
 * @param {*} state
 */
const newAffectationRequest = state => state.merge({ loading: true })

/**
 *
 * reducers action sucess
 *
 * @param {*} state
 * @param {*} { response }
 */
const newAffectationSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

/**
 * reducers action failure
 *
 * @param {*} state
 * @param {*} { error }
 * @returns
 */
const newAffectationFailure = (state, { error }) => {
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
    [Types.NEW_AFFECTATION_REQUEST]: newAffectationRequest,
    [Types.NEW_AFFECTATION_SUCCESS]: newAffectationSuccess,
    [Types.NEW_AFFECTATION_FAILURE]: newAffectationFailure,
})
