import getAllProductSaga from './getProducts'
import addNewCommandeSaga from './newCommande'
import getCommandeSaga from './getCommande'
import validerCommandeSaga from './validerCommande'
import uploadCommandeSaga from './uploadCommande'
import exportPdfCommandeSaga from './exportPdf'

/**
 * export all function saga (API)
 */
const commandeSagas = [
    getAllProductSaga,
    addNewCommandeSaga,
    getCommandeSaga,
    validerCommandeSaga,
    uploadCommandeSaga,
    exportPdfCommandeSaga,
]

export default commandeSagas
