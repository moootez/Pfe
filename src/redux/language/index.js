import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */
/**
 * Inialisation des 3 actions
 */

const { Types, Creators } = createActions({
    changeLanguage: ['language'],
})

export const languageTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    language: 'fr',
})

/* ------------- Reducers ------------- */
/**
 * reducers action change langue
 *
 * @param {*} state
 */
const changeLanguage = (state, { language }) =>
    state.merge({
        language,
    })

/**
 * render redux reducer actions
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.CHANGE_LANGUAGE]: changeLanguage,
})
