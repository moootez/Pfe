import { combineReducers } from 'redux'
import { reducer as allUsers } from './getAllUsers'
import { reducer as addUser } from './addUser'
import { reducer as getUserByToken } from './getUserByCinOrPass'
import { reducer as getUsersByRole } from './getUsersByRole'
import { reducer as editUser } from './editUser'
import { reducer as deleteUser } from './deleteUser'
import { reducer as changePassword } from './changePassword'
import { reducer as resetPassword } from './resetPassword'
import { reducer as sendEmail } from './sendEmail'

/*
 * render all redux reducers actions
 */

/*
 * render all redux reducers actions
 */
export default combineReducers({
    allUsers,
    addUser,
    getUserByToken,
    editUser,
    deleteUser,
    changePassword,
    sendEmail,
    getUsersByRole,
    resetPassword,
})
