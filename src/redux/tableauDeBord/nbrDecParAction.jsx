import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    nbrDecParActionRequest: ['response'],
    nbrDecParActionSuccess: ['response', 'loading'],
    nbrDecParActionFailure: ['error'],
})

export const nbrDecParActionTypes = Types
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
const nbrDecParActionSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const nbrDecParActionFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const nbrDecParActionRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.NBR_DEC_PAR_ACTION_REQUEST]: nbrDecParActionRequest,
    [Types.NBR_DEC_PAR_ACTION_SUCCESS]: nbrDecParActionSuccess,
    [Types.NBR_DEC_PAR_ACTION_FAILURE]: nbrDecParActionFailure,
})
