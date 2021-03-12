import getHistorySaga from './getAllHistoy'
import getHistoryByIDSaga from './getHistoryById'

/**
 * export all function saga (API)
 */
const historySagas = [getHistorySaga, getHistoryByIDSaga]

export default historySagas
