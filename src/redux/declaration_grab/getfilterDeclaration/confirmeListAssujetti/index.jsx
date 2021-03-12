import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    confirmeListAssujettiRequest: ['response'],
    confirmeListAssujettiSuccess: ['response', 'loading'],
    confirmeListAssujettiFailure: ['error'],
})

export const confirmeListAssujettiTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

/**
 * reducers action success
 * @param {*} state
 */
const confirmeListAssujettiSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const confirmeListAssujettiFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const confirmeListAssujettiRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.CONFIRME_LIST_ASSUJETTI_REQUEST]: confirmeListAssujettiRequest,
    [Types.CONFIRME_LIST_ASSUJETTI_SUCCESS]: confirmeListAssujettiSuccess,
    [Types.CONFIRME_LIST_ASSUJETTI_FAILURE]: confirmeListAssujettiFailure,
})
