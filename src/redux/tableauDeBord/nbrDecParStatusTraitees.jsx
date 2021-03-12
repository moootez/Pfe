import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    nbrDecParStatusTraiteesRequest: ['response'],
    nbrDecParStatusTraiteesSuccess: ['response', 'loading'],
    nbrDecParStatusTraiteesFailure: ['error'],
})

export const nbrDecParStatusTraiteesTypes = Types
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
const nbrDecParStatusTraiteesSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const nbrDecParStatusTraiteesFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const nbrDecParStatusTraiteesRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.NBR_DEC_PAR_STATUS_TRAITEES_REQUEST]: nbrDecParStatusTraiteesRequest,
    [Types.NBR_DEC_PAR_STATUS_TRAITEES_SUCCESS]: nbrDecParStatusTraiteesSuccess,
    [Types.NBR_DEC_PAR_STATUS_TRAITEES_FAILURE]: nbrDecParStatusTraiteesFailure,
})
