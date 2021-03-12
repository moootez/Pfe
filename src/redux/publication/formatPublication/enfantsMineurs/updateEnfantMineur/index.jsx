import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    updateEnfantPublicationRequest: ['response'],
    updateEnfantPublicationSuccess: ['response', 'loading'],
    updateEnfantPublicationFailure: ['error'],
})

export const updateEnfantTypes = Types
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
const updateEnfantPublicationRequest = state => state.merge({ loading: true })

/**
 * reducers action request
 * @param {*} state
 */
const updateEnfantPublicationSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action request
 * @param {*} state
 */
const updateEnfantPublicationFailure = (state, { error }) => {
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
    [Types.UPDATE_ENFANT_PUBLICATION_REQUEST]: updateEnfantPublicationRequest,
    [Types.UPDATE_ENFANT_PUBLICATION_SUCCESS]: updateEnfantPublicationSuccess,
    [Types.UPDATE_ENFANT_PUBLICATION_FAILURE]: updateEnfantPublicationFailure,
})
