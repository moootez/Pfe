import getStatistiqueSaga from './getStatistique'
import publierStatistiqueSaga from './publierStatistique'

/**
 * export all function saga (API)
 */
const declarantSagas = [publierStatistiqueSaga, getStatistiqueSaga]

export default declarantSagas
