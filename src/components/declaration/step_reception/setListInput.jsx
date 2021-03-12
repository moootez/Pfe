import Data from '../../../data/dataDeclaration.json'

/**
 *
 *
 * @param {*} payload
 * @param {*} listCategorie
 * @param {*} listDelegEtablissemnt
 * @param {*} listDelegResidence
 * @param {*} listEtablissement
 * @param {*} listGov
 * @param {*} tunNatioId
 * @param {*} listCodePostalResidence
 * @param {*} listNatio
 * @param {*} listFonction
 * @param {*} listMinistere
 * @param {*} listCodePostalEtablissemnt
 * @param {*} ecran
 * @returns
 */
const setListInput = (
    payload,
    listCategorie,
    listDelegEtablissemnt,
    listDelegResidence,
    listEtablissement,
    listGov,
    tunNatioId,
    listCodePostalResidence,
    listNatio,
    listFonction,
    listMinistere,
    listCodePostalEtablissemnt,
    ecran
    // isEditDeclaration,
    // declarantExist,
) => {
    return [
        {
            name: 'typeDeclaration',
            label: 'نوع التصريح',
            list: Data.listItamsDeaclaration,
            isSelect: true,
            selectAll: false,
            sm: 12,
        },
        /*
         * pour input nationalite
         */
        {
            name: 'nationalite',
            label: 'الجنسية',
            list: listNatio,
            isSelect: true,
            selectAll: false,
            sm: 6,
            md: 4,
        },
        payload.nationalite && payload.nationalite !== tunNatioId
            ? {
                  name: 'numPassport',
                  md: 4,
                  label: 'رقم جواز السفر',
                  placeholder: 'رقم جواز السفر',
                  sm: 6,
              }
            : {
                  name: 'numCin',
                  label: 'رقم بطاقة التعريف الوطنية ',
                  placeholder: 'رقم بطاقة التعريف الوطنية ',
                  md: 4,
                  sm: 6,
                  type: 'number',
              },
        payload.nationalite && payload.nationalite !== tunNatioId
            ? {
                  name: 'datDelivranceCin',
                  label: 'تاريخ اصدار جواز السفر',
                  isDate: true,
                  type: 'date',
                  props: {
                      disableFuture: false,
                  },
                  sm: 6,
                  md: 4,
              }
            : {
                  name: 'datDelivranceCin',
                  label: 'تاريخ اصدار بطاقة التعريف الوطنية',
                  isDate: true,
                  type: 'date',
                  props: {
                      disableFuture: false,
                  },
                  sm: 6,
                  md: 4,
              },
        {
            name: 'sexe',
            label: 'الجنس',
            list: Data.listSexe,
            isSelect: true,
            selectAll: false,
            sm: 6,
            md: 4,
        },
        /*
         * pour input prenomTripartite
         */
        {
            name: 'prenomTripartite',
            sm: 6,
            md: 4,
            label: 'الاسم الثلاثي',
            placeholder: 'الاسم الثلاثي',
        },
        /*
         * pour input nom
         */
        {
            name: 'nom',
            sm: 6,
            md: 4,
            label: 'اللقب',
            placeholder: 'اللقب',
        },
        {
            name: 'situationCivile',
            label: 'الحالة المدنية',
            list: Data.listEtatCivile,
            isSelect: true,
            selectAll: false,
            sm: 6,
            md: 4,
        },
        /*
         * pour input dateNaissance
         */
        {
            name: 'dateNaissance',
            label: 'تاريخ الولادة',
            isDate: true,
            type: 'date',
            sm: 6,
            md: 4,
        },
        {
            name: 'adresseNaissance',
            label: 'مكان الولادة',
            list: listGov,
            isSelect: true,
            // isAutoComplete: true,
            selectAll: false,
            sm: 6,
            md: 4,
        },
        ecran === 'addDeclarantAssujetti' && /*
         * pour input adresseResidence
         */ {
            name: 'adresseResidence',
            label: 'عنوان الإقامة',
            placeholder: 'عنوان الإقامة',
            sm: 12,
        },
        ecran !== 'addDeclarantAssujetti' && {
            name: 'numeroResidence',
            label: 'رقم الإقامة',
            placeholder: 'رقم الإقامة',
            sm: 6,
            md: 4,
            type: 'number',
        },
        ecran !== 'addDeclarantAssujetti' && {
            name: 'rueResidence',
            label: 'نهج',
            placeholder: 'نهج',
            sm: 8,
        },
        /*
         * pour input gouvernoratResidence
         */
        {
            name: 'gouvernoratResidence',
            label: 'الولاية',
            list: listGov,
            isAutoComplete: true,
            selectAll: false,
            sm: 6,
            md: 4,
        },
        /*
         * pour input delegationResidence
         */
        {
            name: 'delegationResidence',
            label: 'المعتمدية',
            list: listDelegResidence,
            isAutoComplete: true,
            selectAll: false,
            sm: 6,
            md: 4,
        },
        /*
         * pour input codePostaleResidence
         */
        {
            name: 'codePostaleResidence',
            required: false,
            label: 'الرقم البريدي',
            list: listCodePostalResidence,
            isAutoComplete: true,
            selectAll: true,
            sm: 6,
            md: 4,
        },
        /*
         * pour input categorie
         */
        {
            name: 'categorie',
            label: 'الصفة الموجبة للتصريح',
            list: listCategorie,
            isAutoComplete: true,
            selectAll: false,
            sm: 12,
            md: 12,
        },
        /*
         * pour input fonction
         */
        {
            name: 'fonction',
            label: 'الوظيفة',
            list: listFonction,
            isAutoComplete: true,
            selectAll: false,
            sm: 6,
            md: 4,
        },
        /*
         * pour input ministere
         */
        {
            name: 'ministere',
            label: 'الوزارة',
            list: listMinistere,
            isAutoComplete: true,
            selectAll: false,
            sm: 6,
            md: 4,
        },
        /*
         * pour input etablissement
         */
        {
            name: 'etablissement',
            label: 'الهيكل المشغل',
            list: listEtablissement,
            isAutoComplete: true,
            selectAll: false,
            sm: 6,
            md: 4,
        },
        {
            name: 'adresseEtablissement',
            sm: 12,
            label: 'عنوان الهيكل المشغل',
            placeholder: 'عنوان الهيكل المشغل',
        },
        {
            name: 'gouvernoratEtablissement',
            label: 'الولاية',
            list: listGov,
            isAutoComplete: true,
            selectAll: false,
            sm: 6,
            md: 4,
        },
        {
            name: 'delegationEtablissement',
            label: 'المعتمدية',
            list: listDelegEtablissemnt,
            isAutoComplete: true,
            selectAll: false,
            sm: 6,
            md: 4,
        },
        {
            name: 'codePostaleEtablissement',
            required: false,
            label: 'الرقم البريدي',
            list: listCodePostalEtablissemnt,
            isAutoComplete: true,
            selectAll: true,
            sm: 6,
            md: 4,
        },
        /*
         * pour input datePriseFonction
         */
        {
            name: 'datePriseFonction',
            isDate: true,
            type: 'date',
            sm: 6,
            md: 4,
            label: 'تاريخ اكتساب الصفة الموجبة للتصريح',
        },
        (payload.typeDeclaration === 'declaration depart' ||
            ecran === 'addDeclarantAssujetti') && /*
         * pour input dateFinFonction
         */ {
            name: 'dateFinFonction',
            isDate: true,
            required: ecran !== 'addDeclarantAssujetti',
            sm: 6,
            md: 4,
            label: 'تاريخ   نهاية  الصفة الموجبة للتصريح',
        },
        /*
         * pour input tel
         */
        {
            name: 'tel',
            label: 'رقم الهاتف الشخصي',
            placeholder: 'رقم الهاتف الشخصي',
            isTel: true,
            sm: 6,
            md: 4,
        },
        /*
         * pour input email
         */
        {
            name: 'email',
            sm: 6,
            md: 4,
            required: true,
            label: ' البريد الإلكتروني',
            placeholder: ' البريد الإلكتروني',
            type: 'email',
        },
        {
            name: 'atteste',
            label:
                'لقد تم التثبت من إستكمال تعمير التصريح . كل المعلومات الأتي ذكرها متوفرة ',
            isCheck: true,
            sm: 12,
        },
        {
            name: 'decConjoint',
            label: 'المعطيات المتعلقة بالقرين',
            isCheck: true,
            sm: 3,
        },
        {
            name: 'decChildren',
            label: 'المعطيات المتعلقة بالابناء القصر',
            isCheck: true,
            sm: 3,
        },
        {
            name: 'decBien',
            label: 'معطيات التصريح بالممتلكات',
            isCheck: true,
            sm: 3,
        },
        {
            name: 'decIntr',
            label: 'معطيات التصريح بالمصالح',
            isCheck: true,
            sm: 3,
        },
    ]
}

export default setListInput
