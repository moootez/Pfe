import { combineReducers } from 'redux'
import { reducer as getAssurances } from './getAssurances'
import { reducer as addAssurances } from './addAssurances'
import { reducer as updateAssurances } from './updateAssurances'

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getAssurances,
    addAssurances,
    updateAssurances,
})
