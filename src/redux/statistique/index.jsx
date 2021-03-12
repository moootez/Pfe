import { combineReducers } from 'redux'
import { reducer as publierStatistique } from './publierStatistique'
import { reducer as getStatistique } from './getStatistique'

/*
 * render all redux reducers actions
 */

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getStatistique,
    publierStatistique,
})
