/**
 *
 *
 * @returns
 */
const consultationInput = () => {
    return [
        {
            name: 'prenomTripartiteAr',
            sm: 6,
            md: 6,
            label: 'الاسم الثلاثي :',
            isObject: false,
            required: true,
        },
        {
            name: 'nomAr',
            sm: 6,
            md: 6,
            label: 'اللقب : ',
            isObject: false,
            required: true,
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
            // required: true,
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
        /*
         * pour input nationalite
         */
        {
            name: 'nationalite',
            label: 'الجنسية : ',
            sm: 6,
            md: 6,
            isObject: true,
        },
        {
            name: 'numCin',
            label: 'رقم بطاقة التعريف الوطنية : ',
            sm: 6,
            md: 6,
            required: true,
            isObject: false,
        },
        /*
         * pour input datePriseFonction
         */
        {
            name: 'datePriseFonction',
            label: 'تاريخ المباشرة :',
            sm: 6,
            md: 6,
            date: true,
            isObject: false,
            required: true,
        },
        /*
         * pour input dateFinFonction
         */
        {
            name: 'dateFinFonction',
            label: 'تاريخ المغادرة :',
            sm: 6,
            md: 6,
            date: true,
            isObject: false,
            required: true,
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
            required: false,
        },
    ]
}

export default consultationInput
