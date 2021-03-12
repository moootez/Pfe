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
 * @param {*} isEditDeclaration
 * @param {*} listDelegNaissance
 * @param {*} listCodePostalNaissance
 * @returns
 */
const ListInput = (
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
    isEditDeclaration,
    listDelegNaissance,
    listCodePostalNaissance
) => {
    return [
        /*
         * pour input nationalite
         */
        {
            name: 'nationalite',
            label: 'الجنسية',
            list: listNatio,
            isSelect: true,
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
            sm: 6,
            md: 4,
        },
        {
            name: 'prenomTripartiteAr',
            sm: 6,
            md: 4,
            label: 'الاسم الثلاثي',
            placeholder: 'الاسم الثلاثي',
        },
        {
            name: 'nomAr',
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
            sm: 12,
            label: 'عنوان الولادة',
            placeholder: 'عنوان الولادة',
        },
        {
            name: 'gouvernoratNaissance',
            label: 'مكان الولادة',
            list: listGov,
            isAutoComplete: true,
            sm: 6,
            md: 4,
        },
        {
            name: 'delegationNaissance',
            label: 'المعتمدية',
            placeholder: 'المعتمدية',
            list: listDelegNaissance,
            isAutoComplete: true,
            sm: 6,
            md: 4,
        },
        {
            name: 'codePostaleNaissance',
            required: false,
            label: 'الرقم البريدي',
            list: listCodePostalNaissance,
            isAutoComplete: true,
            selectAll: true,
            sm: 6,
            md: 4,
        },
        /*
         * pour input adresseResidence
         */
        {
            name: 'adresseResidence',
            sm: 12,
            label: 'عنوان الإقامة',
            placeholder: 'عنوان الإقامة',
        },
        /*
         * pour input gouvernoratResidence
         */
        {
            name: 'gouvernoratResidence',
            label: 'مكان الإقامة',
            list: listGov,
            isAutoComplete: true,
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
            sm: 6,
            md: 4,
        },
        {
            name: 'delegationEtablissement',
            label: 'المعتمدية',
            list: listDelegEtablissemnt,
            isAutoComplete: true,
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
            required: false,
        },
        /*
         * pour input dateFinFonction
         */
        {
            name: 'dateFinFonction',
            isDate: true,
            sm: 6,
            md: 4,
            label: 'تاريخ   نهاية  الصفة الموجبة للتصريح',
            required: false,
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
            required: false,
        },
        /*
         * pour input email
         */
        {
            name: 'email',
            sm: 6,
            md: 4,
            required: false,
            label: ' البريد الإلكتروني',
            placeholder: ' البريد الإلكتروني',
            type: 'email',
        },
    ]
}

export default ListInput
