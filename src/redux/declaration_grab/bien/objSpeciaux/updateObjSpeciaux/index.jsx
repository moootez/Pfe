import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    updateObjSpeciauxRequest: ['response'],
    updateObjSpeciauxSuccess: ['response', 'loading'],
    updateObjSpeciauxFailure: ['error'],
})

export const updateObjSpeciauxTypes = Types
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
const updateObjSpeciauxRequest = state => state.merge({ loading: true })

/**
 * reducers action success
 * @param {*} state
 */
const updateObjSpeciauxSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

/**
 * reducers action failure
 * @param {*} state
 */
const updateObjSpeciauxFailure = (state, { error }) => {
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
    [Types.UPDATE_OBJ_SPECIAUX_REQUEST]: updateObjSpeciauxRequest,
    [Types.UPDATE_OBJ_SPECIAUX_SUCCESS]: updateObjSpeciauxSuccess,
    [Types.UPDATE_OBJ_SPECIAUX_FAILURE]: updateObjSpeciauxFailure,
})
