import { combineReducers } from 'redux'
import { reducer as getFonts } from './getFonts'
import { reducer as addFonts } from './addFonts'
import { reducer as updateFonts } from './updateFonts'

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getFonts,
    addFonts,
    updateFonts,
})
