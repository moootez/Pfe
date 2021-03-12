import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    addSpecesRequest: ['response'],
    addSpecesSuccess: ['response', 'loading'],
    addSpecesFailure: ['error'],
})

export const addSpecesTypes = Types
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
const addSpecesSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
/**
 * reducers action failure
 * @param {*} state
 */
const addSpecesFailure = (state, { error }) => {
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
const addSpecesRequest = state => state.merge({ loading: true, error: null })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_SPECES_REQUEST]: addSpecesRequest,
    [Types.ADD_SPECES_SUCCESS]: addSpecesSuccess,
    [Types.ADD_SPECES_FAILURE]: addSpecesFailure,
})
