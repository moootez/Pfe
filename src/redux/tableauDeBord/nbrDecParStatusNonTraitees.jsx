import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    nbrDecParStatusNonTraiteesRequest: ['response'],
    nbrDecParStatusNonTraiteesSuccess: ['response', 'loading'],
    nbrDecParStatusNonTraiteesFailure: ['error'],
})

export const nbrDecParStatusNonTraiteesTypes = Types
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
const nbrDecParStatusNonTraiteesSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const nbrDecParStatusNonTraiteesFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const nbrDecParStatusNonTraiteesRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.NBR_DEC_PAR_STATUS_NON_TRAITEES_REQUEST]: nbrDecParStatusNonTraiteesRequest,
    [Types.NBR_DEC_PAR_STATUS_NON_TRAITEES_SUCCESS]: nbrDecParStatusNonTraiteesSuccess,
    [Types.NBR_DEC_PAR_STATUS_NON_TRAITEES_FAILURE]: nbrDecParStatusNonTraiteesFailure,
})
