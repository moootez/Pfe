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
            name: 'codeDeclaration',
            label: 'رمز التصريح :',
            sm: 6,
            isObject: false,
            required: true,
        },
        {
            name: 'createdAt',
            label: 'تاريخ التصريح :',
            sm: 6,
            isObject: false,
            required: true,
        },
        {
            name: 'typeDeclaration',
            label: 'نوع التصريح :',
            sm: 6,
            isObject: false,
            required: true,
            list: 'typeDeclaration',
            type: 'data',
        },
        /*
         * pour input nationalite
         */
        {
            name: 'nationalite',
            label: 'الجنسية : ',
            sm: 6,
            md: 6,
            isObject: true,
            required: true,
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
            md: 6,
            isObject: false,
            required: true,
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
            isObject: false,
            required: true,
        },
        {
            name: 'sexe',
            label: 'الجنس :',
            sm: 6,
            md: 6,
            isObject: false,
            required: true,
            list: 'listSexe',
            type: 'data',
        },
        /*
         * pour input prenomTripartite
         */
        {
            name: 'prenomTripartite',
            sm: 6,
            md: 6,
            label: 'الاسم الثلاثي :',
            isObject: false,
            required: true,
        },
        /*
         * pour input nom
         */
        {
            name: 'nom',
            sm: 6,
            md: 6,
            label: 'اللقب : ',
            isObject: false,
            required: true,
        },
        {
            name: 'situationCivile',
            label: 'الحالة المدنية :',
            sm: 6,
            md: 6,
            isObject: true,
            object: true,
            required: true,
            list: 'listEtatCivile',
            type: 'data',
        },
        /*
         * pour input dateNaissance
         */
        {
            name: 'dateNaissance',
            label: 'تاريخ الولادة :',
            sm: 6,
            md: 6,
            isObject: false,
            required: true,
            date: true,
        },
        {
            name: 'adresseNaissance',
            label: 'مكان الولادة :',
            sm: 6,
            md: 6,
            isObject: true,
            object: 'user',
            required: true,
        },

        /*
         * pour input gouvernoratResidence
         */
        {
            name: 'gouvernoratResidence',
            label: 'الولاية :',
            sm: 6,
            md: 6,
            isObject: true,
            required: true,
        },
        /*
         * pour input delegationResidence
         */
        {
            name: 'delegationResidence',
            label: 'المعتمدية :',
            sm: 6,
            md: 6,
            isObject: true,
            required: true,
        },
        /*
         * pour input codePostaleResidence
         */
        {
            name: 'codePostaleResidence',
            label: 'الرقم البريدي :',
            sm: 6,
            md: 6,
            isObject: true,
            required: false,
        },
        /*
         * pour input categorie
         */
        {
            name: 'categorie',
            label: 'الفئة :',
            sm: 6,
            md: 6,
            // isObject: true,
            required: true,
        },
        /*
         * pour input fonction
         */
        {
            name: 'fonction',
            label: 'الوظيفة :',
            sm: 6,
            md: 6,
            isObject: true,
            required: true,
        },
        /*
         * pour input ministere
         */
        {
            name: 'ministere',
            label: 'الوزارة :',
            sm: 6,
            md: 6,
            isObject: true,
            required: true,
        },
        /*
         * pour input etablissement
         */
        {
            name: 'etablissement',
            label: 'الهيكل المشغل :',
            sm: 6,
            md: 6,
            isObject: true,
            required: true,
        },
        {
            name: 'adresseEtablissement',
            sm: 6,
            md: 6,
            label: 'عنوان الهيكل المشغل :',
            isObject: false,
            required: true,
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
            name: 'gouvernoratEtablissement',
            label: 'الولاية :',
            sm: 6,
            md: 6,
            isObject: true,
            required: true,
        },
        {
            name: 'delegationEtablissement',
            label: 'المعتمدية :',
            sm: 6,
            md: 6,
            isObject: true,
            required: true,
        },
        {
            name: 'codePostaleEtablissement',
            required: false,
            label: 'الرقم البريدي :',
            sm: 6,
            md: 6,
            isObject: true,
        },
        /*
         * pour input tel
         */
        {
            name: 'tel',
            label: 'رقم الهاتف الشخصي:',
            sm: 6,
            md: 6,
            isObject: false,
            object: 'user',
            required: true,
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
