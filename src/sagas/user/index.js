import { getAllUsersSaga } from './getAllUsers'
import { addUserSaga } from './addUser'
import { editUserSaga } from './editUser'
import { getUserByTokenSaga } from './getUserByCinOrPass'
import { getUsersByRoleSaga } from './getUsersByRole'
import { changePasswordSaga } from './changePassword'
import { resetPasswordSaga } from './resetPassword'
import { sendEmailSaga } from './sendEmail'

/**
 * export all function saga (API)
 */
const userSagas = [
    getAllUsersSaga,
    getUserByTokenSaga,
    getUsersByRoleSaga,
    addUserSaga,
    editUserSaga,
    changePasswordSaga,
    sendEmailSaga,
    resetPasswordSaga,
]

export default userSagas
