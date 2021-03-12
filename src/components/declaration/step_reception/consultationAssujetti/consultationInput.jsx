// import Data from '../../../../data/dataDeclaration.json'

/**
 *
 *
 * @param {*} payload
 * @returns
 */
const consultationInput = payload => {
    return [
        {
            name: 'typeDeclaration',
            label: 'نوع التصريح :',
            sm: 12,
            type: 'data',
            list: 'typeDeclaration',
        },
        {
            name: 'nationaliteUser',
            label: 'الجنسية : ',
            sm: 6,
            md: 6,
        },
        payload.nationalite.intituleFr === 'Tunisienne'
            ? {
                  name: 'numCin',
                  label: 'رقم بطاقة التعريف الوطنية : ',
                  sm: 6,
                  md: 6,
                  required: true,
                  isObject: false,
              }
            : {
                  name: 'numPassport',
                  label: 'رقم جواز السفر : ',
                  sm: 6,
                  md: 6,
                  required: true,
                  isObject: false,
              },
        {
            name: 'datDelivranceCin',
            label: 'تاريخ اصدار بطاقة التعريف الوطنية :',
            sm: 6,
            date: true,
        },
        /*
         * pour input adresseResidence
         */
        {
            name: 'adresseResidence',
            label: 'عنوان الاقامة :',
            sm: 6,
            md: 6,
        },
        {
            name: 'sexe',
            label: 'الجنس :',
            sm: 6,
            md: 6,
            type: 'data',
            list: 'listSexe',
        },
        /*
         * pour input prenomTripartite
         */
        {
            name: 'prenomTripartite',
            sm: 6,
            md: 6,
            label: 'الاسم الثلاثي :',
        },
        /*
         * pour input nom
         */
        {
            name: 'nom',
            sm: 6,
            md: 6,
            label: 'اللقب : ',
        },
        {
            name: 'situationCivile',
            label: 'الحالة المدنية :',
            sm: 6,
            md: 6,
            type: 'data',
            list: 'listEtatCivile',
            isObject: true,
            object: 'user',
        },
        /*
         * pour input dateNaissance
         */
        {
            name: 'dateNaissance',
            label: 'تاريخ الولادة :',
            sm: 6,
            md: 6,
            date: true,
        },
        {
            name: 'adresseNaissance',
            label: 'مكان الولادة :',
            sm: 6,
            md: 6,
        },

        {
            name: 'gouvernoratResidenceUser',
            label: 'الولاية :',
            sm: 6,
            md: 6,
        },
        {
            name: 'delegationResidenceUser',
            label: 'المعتمدية :',
            sm: 6,
            md: 6,
        },
        /*
         * pour input codePostaleResidence
         */
        {
            name: 'codePostaleResidence',
            label: 'الرقم البريدي :',
            sm: 6,
            md: 6,
        },
        {
            name: 'categorieUser',
            label: 'الفئة :',
            sm: 6,
            md: 6,
        },
        {
            name: 'fonctionUser',
            label: 'الوظيفة :',
            sm: 6,
            md: 6,
        },
        {
            name: 'ministereUser',
            label: 'الوزارة :',
            sm: 6,
            md: 6,
        },
        {
            name: 'etablissementUser',
            label: 'الهيكل المشغل :',
            sm: 6,
            md: 6,
        },
        {
            name: 'adresseEtablissement',
            sm: 6,
            md: 6,
            label: 'عنوان الهيكل المشغل :',
        },
        /*
         * pour input datePriseFonction
         */
        {
            name: 'datePriseFonction',
            label: 'تاريخ اكتساب الصفة الموجبة للتصريح :',
            sm: 6,
            md: 6,
            isObject: false,
            required: true,
            date: true,
        },
        {
            name: 'gouvernoratEtablissementUser',
            label: 'الولاية :',
            sm: 6,
            md: 6,
        },
        {
            name: 'delegationEtablissementUser',
            label: 'المعتمدية :',
            sm: 6,
            md: 6,
        },
        {
            name: 'codePostaleEtablissement',
            required: false,
            label: 'الرقم البريدي :',
            sm: 6,
            md: 6,
        },
        /*
         * pour input tel
         */
        {
            name: 'tel',
            label: 'رقم الهاتف الشخصي:',
            isTel: true,
            sm: 6,
            md: 6,
            isObject: true,
            object: 'user',
        },
        /*
         * pour input email
         */
        {
            name: 'email',
            sm: 6,
            md: 6,
            label: ' البريد الإلكتروني :',
            isObject: true,
            object: 'user',
            required: false,
        },
    ]
}

export default consultationInput
