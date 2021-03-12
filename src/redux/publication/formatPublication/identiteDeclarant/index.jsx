import { combineReducers } from 'redux'
import { reducer as getIdentiteDeclarantPublication } from './getIdentiteDeclarant'
import { reducer as updateIdentiteDeclarantPublication } from './updateIdentiteDeclarant'

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getIdentiteDeclarantPublication,
    updateIdentiteDeclarantPublication,
})
