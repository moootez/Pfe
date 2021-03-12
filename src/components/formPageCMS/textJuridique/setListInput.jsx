/**
 *
 *
 * @returns
 */
const setListInput = () => {
    return [
        {
            name: 'nature',
            sm: 12,
            md: 12,
            list: [
                { label: 'قانون', value: 1 },
                { label: 'أمر مرسوم', value: 2 },
                { label: 'مذكرة', value: 3 },
            ],
            label: 'طبيعة النص القانوني',
            placeholder: 'طبيعة النص القانوني',
            isSelect: true,
        },
        {
            name: 'nomAr',
            sm: 6,
            md: 4,
            label: 'إسم النص القانوني (Ar)',
            placeholder: 'إسم النص القانوني (Ar)',
            lng: 'ar',
        },
        {
            name: 'nomFr',
            sm: 6,
            md: 4,
            label: 'إسم النص القانوني (Fr)',
            placeholder: 'إسم النص القانوني (Fr)',
            lng: 'fr',
        },
        {
            name: 'nomEn',
            sm: 6,
            md: 4,
            label: 'إسم النص القانوني (En)',
            placeholder: 'إسم النص القانوني (En)',
            lng: 'en',
        },
        {
            name: 'contenuAr',
            sm: 12,
            md: 12,
            label: 'وصف النص القانوني (Ar)',
            placeholder: 'وصف النص القانوني (Ar)',
            lng: 'ar',
            required: false,
            isTextErea: true,
        },
        {
            name: 'contenuFr',
            sm: 12,
            md: 12,
            label: 'وصف النص القانوني (Fr)',
            placeholder: 'وصف النص القانوني (Fr)',
            lng: 'fr',
            required: false,
            isTextErea: true,
        },
        {
            name: 'contenuEn',
            sm: 12,
            md: 12,
            label: 'وصف النص القانوني (En)',
            placeholder: 'وصف النص القانوني (En)',
            lng: 'en',
            required: false,
            isTextErea: true,
        },
        {
            name: 'fileAr',
            sm: 6,
            md: 4,
            label: 'تحميل النص القانوني (Ar)',
            placeholder: 'تحميل النص القانوني (Ar)',
            type: 'file',
        },
        {
            name: 'fileFr',
            sm: 6,
            md: 4,
            label: 'تحميل النص القانوني (Fr)',
            placeholder: 'تحميل النص القانوني (Fr)',
            type: 'file',
        },
        {
            name: 'fileEn',
            sm: 6,
            md: 4,
            label: 'تحميل النص القانوني (En)',
            placeholder: 'تحميل النص القانوني (En)',
            type: 'file',
        },
    ]
}

export default setListInput
