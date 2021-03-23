import getAllProductSaga from './getProducts'
import addNewCommandeSaga from './newCommande'
import getCommandeSaga from './getCommande'
import validerCommandeSaga from './validerCommande'

/**
 * export all function saga (API)
 */
const commandeSagas = [
    getAllProductSaga,
    addNewCommandeSaga,
    getCommandeSaga,
    validerCommandeSaga,
]

export default commandeSagas
