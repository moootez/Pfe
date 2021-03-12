import { combineReducers } from 'redux'
import { reducer as getConjointDeclaration } from './getConjoint'
import { reducer as addConjointDeclaration } from './addConjoint'
import { reducer as updateConjointDeclaration } from './updateConjoint'

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getConjointDeclaration,
    addConjointDeclaration,
    updateConjointDeclaration,
})
