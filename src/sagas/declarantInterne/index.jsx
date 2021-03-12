import addDeclarantInterneSaga from './addDeclarantInterne'
import getFilterDeclarantInterneSaga from './getDeclarantInterne'
import getDeclarantAvisSaga from './getDeclarantAvis'
import getDeclarantSanctionSaga from './getDeclarantSanction'
import addSanctionSaga from './addSanction'
import addAvisSaga from './addAvis'
import getAvisSaga from './getAvisById'
import getSanctionSaga from './getSanctionById'
import editAvisSaga from './editAvis'
import editSanctionSaga from './editSanction'
import getReceivedAvisSaga from './getReceivedAvis'
import getDeclarantInterneSaga from './getDeclarantById'
import editDeclarantInterneSaga from './editDeclarantInterne'
import getExportPdfSaga from './getExportPdf'
import getExportCsvSaga from './getExportCsv'
import getExportExcelSaga from './getExportExcel'

/**
 * export all function saga (API)
 */
const declarantSagas = [
    getExportCsvSaga,
    getExportExcelSaga,
    getExportPdfSaga,
    getReceivedAvisSaga,
    editSanctionSaga,
    editAvisSaga,
    getSanctionSaga,
    getAvisSaga,
    addAvisSaga,
    addSanctionSaga,
    getFilterDeclarantInterneSaga,
    getDeclarantAvisSaga,
    getDeclarantSanctionSaga,
    addDeclarantInterneSaga,
    getDeclarantInterneSaga,
    editDeclarantInterneSaga,
]

export default declarantSagas
