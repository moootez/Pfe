import { combineReducers } from 'redux'
import { reducer as getConjointPublication } from './getConjoint'
import { reducer as updateConjointPublication } from './updateConjoint'

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getConjointPublication,
    updateConjointPublication,
})
