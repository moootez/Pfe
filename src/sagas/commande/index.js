import getAllProductSaga from './getProducts'
import addNewCommandeSaga from './newCommande'
import getCommandeSaga from './getCommande'
import validerCommandeSaga from './validerCommande'
import uploadCommandeSaga from './uploadCommande'

/**
 * export all function saga (API)
 */
const commandeSagas = [
    getAllProductSaga,
    addNewCommandeSaga,
    getCommandeSaga,
    validerCommandeSaga,
    uploadCommandeSaga,
]

export default commandeSagas
