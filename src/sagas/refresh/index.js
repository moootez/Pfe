import syncUserSaga from './userRefresh'
import syncProduitsSaga from './articleRefresh'
/**
 * export all function saga (API)
 */
const sync = [syncUserSaga, syncProduitsSaga]
export default sync
