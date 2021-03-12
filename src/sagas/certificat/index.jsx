import getCertifSaga from './getCertif'
import cryptosignSaga from './cryptosign'
import getInfoSaga from './getInfo'

/**
 * export all function saga (API)
 */
const certificatSagas = [getInfoSaga, cryptosignSaga, getCertifSaga]

export default certificatSagas
