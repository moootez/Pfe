/**
 *
 * list input
 * @returns
 */
const consultationInput = () => {
    return [
        {
            name: 'codeInsc',
            sm: 12,
            label: 'الرمز :',
        },
        {
            name: 'prenomTripartiteAr',
            sm: 6,
            md: 6,
            label: 'الاسم الثلاثي :',
        },
        {
            name: 'nomAr',
            sm: 6,
            md: 6,
            label: 'اللقب : ',
        },
        /*
         * pour input categorie
         */
        {
            name: 'categorie',
            label: 'الفئة :',
            sm: 6,
            md: 6,
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
        },
        /*
         * pour input email
         */
        {
            name: 'email',
            sm: 6,
            md: 6,
            label: ' البريد الإلكتروني :',
        },
    ]
}

export default consultationInput
