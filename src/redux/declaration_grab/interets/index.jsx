import { combineReducers } from 'redux'
import actConjoint from './actConjoint'
import cadeaux from './cadeaux'
import etudes from './etudes'
import liberale from './liberale'
import membres from './membres'
import salarie from './salarie'

/*
 * render all redux reducers actions
 */
export default combineReducers({
    actConjoint,
    cadeaux,
    etudes,
    liberale,
    membres,
    salarie,
})
