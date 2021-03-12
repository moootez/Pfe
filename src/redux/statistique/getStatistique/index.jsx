import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    getStatistiqueRequest: ['response'],
    getStatistiqueSuccess: ['response', 'loading'],
    getStatistiqueFailure: ['error'],
})

export const getStatistiqueTypes = Types
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
const getStatistiqueRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const getStatistiqueSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const getStatistiqueFailure = (state, { error }) => {
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
    [Types.GET_STATISTIQUE_REQUEST]: getStatistiqueRequest,
    [Types.GET_STATISTIQUE_SUCCESS]: getStatistiqueSuccess,
    [Types.GET_STATISTIQUE_FAILURE]: getStatistiqueFailure,
})
