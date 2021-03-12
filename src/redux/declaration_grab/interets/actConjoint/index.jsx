import { combineReducers } from 'redux'
import { reducer as getActConjoint } from './getActConjoint'
import { reducer as addActConjoint } from './addActConjoint'
import { reducer as updateActConjoint } from './updateActConjoint'

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getActConjoint,
    addActConjoint,
    updateActConjoint,
})
