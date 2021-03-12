import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    nbrDecParYearRequest: ['response'],
    nbrDecParYearSuccess: ['response', 'loading'],
    nbrDecParYearFailure: ['error'],
})

export const nbrDecParYearTypes = Types
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
const nbrDecParYearSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const nbrDecParYearFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const nbrDecParYearRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.NBR_DEC_PAR_YEAR_REQUEST]: nbrDecParYearRequest,
    [Types.NBR_DEC_PAR_YEAR_SUCCESS]: nbrDecParYearSuccess,
    [Types.NBR_DEC_PAR_YEAR_FAILURE]: nbrDecParYearFailure,
})
