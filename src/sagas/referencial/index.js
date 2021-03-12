import { getAllReferencialSaga } from './getAllReferencialSaga/index'
import { getAllCodePostalSaga } from './getAllCodePostal/index'
import { addNewReferencialSaga } from './addNewReferencialSaga'
import { deleteReferencialSaga } from './deleteReferencialSaga'
import { editReferencialSaga } from './editReferencialSaga'
import { getCodePostalByGovSaga } from './getCodePostalByGovReference'

/**
 * export all function saga (API)
 */
const referencialSagas = [
    getAllReferencialSaga,
    getAllCodePostalSaga,
    addNewReferencialSaga,
    deleteReferencialSaga,
    editReferencialSaga,
    getCodePostalByGovSaga,
]

export default referencialSagas
