/**
 *
 *
 * @returns
 */
const setListInput = () => {
    return [
        {
            name: 'nomAr',
            sm: 6,
            md: 4,
            label: 'إسم تقرير (Ar)',
            placeholder: 'إسم تقرير (Ar)',
            lng: 'ar',
        },
        {
            name: 'nomFr',
            sm: 6,
            md: 4,
            label: 'إسم تقرير (Fr)',
            placeholder: 'إسم تقرير (Fr)',
            lng: 'fr',
        },
        {
            name: 'nomEn',
            sm: 6,
            md: 4,
            label: 'إسم تقرير (En)',
            placeholder: 'إسم تقرير (En)',
            lng: 'en',
        },
        {
            name: 'contenuAr',
            sm: 12,
            md: 12,
            label: 'وصف التقرير (Ar)',
            placeholder: 'وصف التقرير (Ar)',
            lng: 'ar',
            required: false,
            isTextErea: true,
        },
        {
            name: 'contenuFr',
            sm: 12,
            md: 12,
            label: 'وصف التقرير (Fr)',
            placeholder: 'وصف التقرير (Fr)',
            lng: 'fr',
            required: false,
            isTextErea: true,
        },
        {
            name: 'contenuEn',
            sm: 12,
            md: 12,
            label: 'وصف التقرير (En)',
            placeholder: 'وصف التقرير (En)',
            lng: 'en',
            required: false,
            isTextErea: true,
        },
        {
            name: 'fileAr',
            sm: 6,
            md: 4,
            label: 'تحميل الوثيقة (Ar)',
            placeholder: 'تحميل الوثيقة (Ar)',
            type: 'file',
        },
        {
            name: 'fileFr',
            sm: 6,
            md: 4,
            label: 'تحميل الوثيقة (Fr)',
            placeholder: 'تحميل الوثيقة (Fr)',
            type: 'file',
        },
        {
            name: 'fileEn',
            sm: 6,
            md: 4,
            label: 'تحميل الوثيقة (En)',
            placeholder: 'تحميل الوثيقة (En)',
            type: 'file',
        },
    ]
}

export default setListInput
