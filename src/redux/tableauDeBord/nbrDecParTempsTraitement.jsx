import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    nbrDecParTempsTraitementRequest: ['response'],
    nbrDecParTempsTraitementSuccess: ['response', 'loading'],
    nbrDecParTempsTraitementFailure: ['error'],
})

export const nbrDecParTempsTraitementTypes = Types
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
const nbrDecParTempsTraitementSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const nbrDecParTempsTraitementFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
/**
 * reducers action request
 * @param {*} state
 */
const nbrDecParTempsTraitementRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.NBR_DEC_PAR_TEMPS_TRAITEMENT_REQUEST]: nbrDecParTempsTraitementRequest,
    [Types.NBR_DEC_PAR_TEMPS_TRAITEMENT_SUCCESS]: nbrDecParTempsTraitementSuccess,
    [Types.NBR_DEC_PAR_TEMPS_TRAITEMENT_FAILURE]: nbrDecParTempsTraitementFailure,
})
