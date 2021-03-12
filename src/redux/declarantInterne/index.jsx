import { combineReducers } from 'redux'
import { reducer as addDeclarantInterne } from './addDeclarantInterne'
import { reducer as getFiltredDeclarantInterne } from './getDeclarantInterne'
import { reducer as getDeclarantAvis } from './getDeclarantAvis'
import { reducer as getDeclarantSanction } from './getDeclarantSanction'
import { reducer as addSanction } from './addSanction'
import { reducer as addAvis } from './addAvis'
import { reducer as getAvis } from './getAvisById'
import { reducer as getSanction } from './getSanctionById'
import { reducer as editSanction } from './editSanction'
import { reducer as editAvis } from './editAvis'
import { reducer as getReceivedAvis } from './getReceivedAvis'
import { reducer as getDeclarantInterne } from './getDeclarantById'
import { reducer as editDeclarantInterne } from './editDeclarantInterne'
import { reducer as getExportPdf } from './getExportPdf'
import { reducer as getExportCsv } from './getExportCsv'
import { reducer as getExportExcel } from './getExportExcel'

/*
 * render all redux reducers actions
 */

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getExportExcel,
    getExportCsv,
    getExportPdf,
    getReceivedAvis,
    editAvis,
    editSanction,
    getSanction,
    getAvis,
    addAvis,
    addSanction,
    addDeclarantInterne,
    getDeclarantSanction,
    getDeclarantAvis,
    getFiltredDeclarantInterne,
    getDeclarantInterne,
    editDeclarantInterne,
})
