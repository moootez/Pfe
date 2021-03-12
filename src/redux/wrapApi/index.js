import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    wrapApiPut: ['response'],
    wrapApiPutFailure: ['response'],
    wrapApiCall: ['request'],
    wrapApiCallFailure: ['request'],
    activeGeneraleLoader: ['response'],
    disableGeneraleLoader: ['response'],
})

export const wrapApiTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    responseError: null,
    request: null,
    requestError: null,
    generalLoader: false,
})

/* ------------- Reducers ------------- */
/**
 * reducers action wrap API put request
 *
 * @param {*} state
 */
const wrapApiPut = (state, { response }) =>
    state.merge({
        response,
        generalLoader: false,
    })
/**
 * reducers action wrapp api put failure
 *
 * @param {*} state
 * @param {*} { error }
 * @returns
 */
const wrapApiPutFailure = (state, { response }) =>
    state.merge({
        response,
        generalLoader: false,
    })
/**
 * reducers action wrapp api call request
 *
 * @param {*} state
 * @param {*} { error }
 * @returns
 */
const wrapApiCall = (state, { request }) =>
    state.merge({
        request,
        generalLoader: true,
    })
/**
 * reducers action wrapp api call failure
 *
 * @param {*} state
 * @param {*} { error }
 * @returns
 */
const wrapApiCallFailure = (state, { request }) =>
    state.merge({
        request,
        generalLoader: false,
    })
/**
 * reducers action show spinner
 *
 * @param {*} state
 * @param {*} { error }
 * @returns
 */
const activeGeneraleLoader = state =>
    state.merge({
        generalLoader: true,
    })
/**
 * reducers action close spinner
 *
 * @param {*} state
 * @param {*} { error }
 * @returns
 */
const disableGeneraleLoader = state =>
    state.merge({
        generalLoader: false,
    })
/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.WRAP_API_PUT]: wrapApiPut,
    [Types.WRAP_API_PUT_FAILURE]: wrapApiPutFailure,
    [Types.WRAP_API_CALL]: wrapApiCall,
    [Types.WRAP_API_CALL_FAILURE]: wrapApiCallFailure,
    [Types.DISABLE_GENERALE_LOADER]: disableGeneraleLoader,
    [Types.ACTIVE_GENERALE_LOADER]: activeGeneraleLoader,
})
