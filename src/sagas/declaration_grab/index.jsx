import { getFilterDeclarationsSaga } from './getfilterDeclaration/getFilterDeclaration'
import { getFilterDeclarationsAssujettiSaga } from './getfilterDeclaration/getFilterDeclarationAssujetti'
import { getFilterDeclarationsForRapprochementSaga } from './getfilterDeclaration/getFilterDeclarationForRapprochement'
import { getFilterDeclarationsEnAttenteDeRapprochementSaga } from './getfilterDeclaration/getfilterDeclarationEnAttenteDeRapprochement'
import { getFilterDeclarationsForValidationSaga } from './getfilterDeclaration/getFilterDeclarationForValidation'
import { getFilterDeclarationsEnAttenteDeValidationSaga } from './getfilterDeclaration/getfilterDeclarationEnAttenteDeValidation'
import { getFilterDeclarationsForVerificationSaga } from './getfilterDeclaration/getFilterDeclarationsForVerification'
import { getFilterDeclarationsEnAttenteDeVerificationSaga } from './getfilterDeclaration/getfilterDeclarationEnAttenteDeVerification'
import { getFilterDeclarationsForPublicationSaga } from './getfilterDeclaration/getFilterDeclarationsForPublication'
import { getFilterDeclarantSaga } from './getfilterDeclaration/getFilterDeclarant'
import { confirmeListAssujettiSaga } from './getfilterDeclaration/confirmeListAssujetti'
import { getResponsableRevenusSaga } from './bien/revenus/getresponsableRevenus/index'
import { getConjointSaga } from './conjoint/getConjoint'
import { addConjointDeclarationsSaga } from './conjoint/addConjoint'
import { updateConjointSaga } from './conjoint/updateConjoint'
import { getEnfantSaga } from './enfantsMineurs/getEnfantMineur'
import { addEnfantMineurDeclarationsSaga } from './enfantsMineurs/addEnfantMineur'
import { updateEnfantSaga } from './enfantsMineurs/updateEnfantMineur'
import { addRevenusSaga } from './bien/revenus/addRevenus/index'
import { updateRevenusSaga } from './bien/revenus/updateRevenus/index'
import { getRevenusSaga } from './bien/revenus/getRevenus/index'
import { addImmeublesSaga } from './bien/immeubles/addImmeubles'
import { getImmeublesSaga } from './bien/immeubles/getImmeubles/index'
import { updateImmeublesSaga } from './bien/immeubles/updateImmeubles/index'
import { addActionsSaga } from './bien/actions/addActions'
import { getActionsSaga } from './bien/actions/getActions/index'
import { updateActionsSaga } from './bien/actions/updateActions/index'
import { addVehiculesSaga } from './bien/vehicules/addVehicules/index'
import { getVehiculesSaga } from './bien/vehicules/getVehicules/index'
import { updateVehiculesSaga } from './bien/vehicules/updateVehicules/index'
import { isExistMatriculeSaga } from './bien/vehicules/isExistMatricule/index'
import { addPartSocialsSaga } from './bien/partSocials/addPartSocials/index'
import { getPartSocialsSaga } from './bien/partSocials/getPartSocials/index'
import { updatePartSocialsSaga } from './bien/partSocials/updatePartSocials/index'
import { addAnimauxSaga } from './bien/animaux/addAnimaux/index'
import { getAnimauxSaga } from './bien/animaux/getAnimaux/index'
import { updateAnimauxSaga } from './bien/animaux/updateAnimaux/index'
import { addValeursSaga } from './bien/valeurs/addValeurs'
import { getValeursSaga } from './bien/valeurs/getValeurs'
import { updateValeursSaga } from './bien/valeurs/updateValeurs'
import { addMontantsSaga } from './bien/montants/addMontants/index'
import { getMontantsSaga } from './bien/montants/getMontants/index'
import { updateMontantsSaga } from './bien/montants/updateMontants/index'
import { addFontsSaga } from './bien/fonts/addFonts/index'
import { getFontsSaga } from './bien/fonts/getFonts/index'
import { updateFontsSaga } from './bien/fonts/updateFonts/index'
import { addSpecesSaga } from './bien/speces/addSpeces/index'
import { getSpecesSaga } from './bien/speces/getSpeces/index'
import { updateSpecesSaga } from './bien/speces/updeteSpeces/index'
import { addObjSpeciauxSaga } from './bien/objSpeciaux/addObjSpeciaux/index'
import { getObjSpeciauxSaga } from './bien/objSpeciaux/getObjSpeciaux/index'
import { updateObjSpeciauxSaga } from './bien/objSpeciaux/updateObjSpeciaux/index'
import { addAssurancesSaga } from './bien/assurances/addAssurances/index'
import { getAssurancesSaga } from './bien/assurances/getAssurances/index'
import { updateAssurancesSaga } from './bien/assurances/updateAssurances/index'
import { addPretsSaga } from './bien/prets/addPrets/index'
import { getPretsSaga } from './bien/prets/getPrets/index'
import { updatePretsSaga } from './bien/prets/updatePrets/index'
import { addActConjointSaga } from './interets/actConjoint/addActConjoint/index'
import { getActConjointSaga } from './interets/actConjoint/getActConjoint/index'
import { updateActConjointSaga } from './interets/actConjoint/updateActConjoint/index'
import { addCadeauxSaga } from './interets/cadeaux/addCadeaux/index'
import { getCadeauxSaga } from './interets/cadeaux/getCadeaux/index'
import { updateCadeauxSaga } from './interets/cadeaux/updateCadeaux/index'
import { addMembresSaga } from './interets/membres/addMembres/index'
import { getMembresSaga } from './interets/membres/getMembres/index'
import { updateMembresSaga } from './interets/membres/updateMembres/index'
import { addEtudesSaga } from './interets/etudes/addEtudes/index'
import { getEtudesSaga } from './interets/etudes/getEtudes/index'
import { updateEtudesSaga } from './interets/etudes/updateEtudes/index'
import { addSalarieSaga } from './interets/salarie/addSalarie/index'
import { getSalarieSaga } from './interets/salarie/getSalarie/index'
import { updateSalarieSaga } from './interets/salarie/updateSalarie/index'
import { addLiberaleSaga } from './interets/liberale/addLiberale/index'
import { getLiberaleSaga } from './interets/liberale/getLiberale/index'
import { updateLiberaleSaga } from './interets/liberale/updateLiberale/index'
import { submitDecSaga } from './submitDecSaisie/index'
import { scanDecSaga } from './scan/index'

/**
 * export all function saga (API)
 */
const declarationSaisieSagas = [
    getFilterDeclarationsSaga,
    getFilterDeclarationsAssujettiSaga,
    getFilterDeclarationsForRapprochementSaga,
    getFilterDeclarationsEnAttenteDeRapprochementSaga,
    getFilterDeclarationsForValidationSaga,
    getFilterDeclarationsEnAttenteDeValidationSaga,
    getFilterDeclarationsForVerificationSaga,
    getFilterDeclarationsForPublicationSaga,
    getFilterDeclarationsEnAttenteDeVerificationSaga,
    confirmeListAssujettiSaga,
    addConjointDeclarationsSaga,
    updateConjointSaga,
    getConjointSaga,
    addEnfantMineurDeclarationsSaga,
    getEnfantSaga,
    updateEnfantSaga,
    getResponsableRevenusSaga,
    addRevenusSaga,
    updateRevenusSaga,
    getRevenusSaga,
    addImmeublesSaga,
    getImmeublesSaga,
    updateImmeublesSaga,
    addActionsSaga,
    getActionsSaga,
    updateActionsSaga,
    addVehiculesSaga,
    getVehiculesSaga,
    updateVehiculesSaga,
    isExistMatriculeSaga,
    addPartSocialsSaga,
    getPartSocialsSaga,
    updatePartSocialsSaga,
    addAnimauxSaga,
    getAnimauxSaga,
    updateAnimauxSaga,
    addValeursSaga,
    getValeursSaga,
    updateValeursSaga,
    addMontantsSaga,
    getMontantsSaga,
    updateMontantsSaga,
    addFontsSaga,
    getFontsSaga,
    updateFontsSaga,
    addSpecesSaga,
    getSpecesSaga,
    updateSpecesSaga,
    addObjSpeciauxSaga,
    getObjSpeciauxSaga,
    updateObjSpeciauxSaga,
    addPretsSaga,
    getPretsSaga,
    updatePretsSaga,
    addAssurancesSaga,
    getAssurancesSaga,
    updateAssurancesSaga,
    addActConjointSaga,
    getActConjointSaga,
    updateActConjointSaga,
    addMembresSaga,
    getMembresSaga,
    updateMembresSaga,
    addCadeauxSaga,
    getCadeauxSaga,
    updateCadeauxSaga,
    addEtudesSaga,
    getEtudesSaga,
    updateEtudesSaga,
    addLiberaleSaga,
    getLiberaleSaga,
    updateLiberaleSaga,
    addSalarieSaga,
    getSalarieSaga,
    updateSalarieSaga,
    submitDecSaga,
    scanDecSaga,
    getFilterDeclarantSaga,
]

export default declarationSaisieSagas
