import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    addEnfantMineurDeclarationsRequest: ['response'],
    addEnfantMineurDeclarationsSuccess: ['response', 'loading'],
    addEnfantMineurDeclarationsFailure: ['error'],
})

export const addEnfantMineurDeclarationsTypes = Types
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
const addEnfantMineurDeclarationsSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const addEnfantMineurDeclarationsFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        loading: false,
        error: true,
        response,
    })
}

/**
 * reducers action request
 * @param {*} state
 */
const addEnfantMineurDeclarationsRequest = state =>
    state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_ENFANT_MINEUR_DECLARATIONS_REQUEST]: addEnfantMineurDeclarationsRequest,
    [Types.ADD_ENFANT_MINEUR_DECLARATIONS_SUCCESS]: addEnfantMineurDeclarationsSuccess,
    [Types.ADD_ENFANT_MINEUR_DECLARATIONS_FAILURE]: addEnfantMineurDeclarationsFailure,
})
