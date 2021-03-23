import getAllProductSaga from './getProducts'
import addNewCommandeSaga from './newCommande'

/**
 * export all function saga (API)
 */
const commandeSagas = [getAllProductSaga, addNewCommandeSaga]

export default commandeSagas
