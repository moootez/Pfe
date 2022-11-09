import { getAllUsersSaga } from './getAllUsers'
import { addUserSaga } from './addUser'
import { editUserSaga } from './editUser'
import { getUserByTokenSaga } from './getUserByCinOrPass'
import { getUsersByRoleSaga } from './getUsersByRole'
import { changePasswordSaga } from './changePassword'
import { resetPasswordSaga } from './resetPassword'
import { sendEmailSaga } from './sendEmail'
import deleteUserSaga from './deleteUser'

/**
 * export all function saga (API)
 */
const userSagas = [
    getAllUsersSaga,
    getUserByTokenSaga,
    getUsersByRoleSaga,
    addUserSaga,
    deleteUserSaga,
    changePasswordSaga,
    sendEmailSaga,
    resetPasswordSaga,
    editUserSaga,
]

export default userSagas
