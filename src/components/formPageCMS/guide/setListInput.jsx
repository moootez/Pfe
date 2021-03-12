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
            label: 'إسم الوثيقة (Ar)',
            placeholder: 'إسم الوثيقة (Ar)',
            lng: 'ar',
        },
        {
            name: 'nomFr',
            sm: 6,
            md: 4,
            label: 'إسم الوثيقة (Fr)',
            placeholder: 'إسم الوثيقة (Fr)',
            lng: 'fr',
        },
        {
            name: 'nomEn',
            sm: 6,
            md: 4,
            label: 'إسم الوثيقة (En)',
            placeholder: 'إسم الوثيقة (En)',
            lng: 'en',
        },
        {
            name: 'descriptionAr',
            sm: 12,
            md: 12,
            label: 'وصف الوثيقة (Ar)',
            placeholder: 'وصف الوثيقة (Ar)',
            lng: 'ar',
            required: false,
        },
        {
            name: 'descriptionFr',
            sm: 12,
            md: 12,
            label: 'وصف الوثيقة (Fr)',
            placeholder: 'وصف الوثيقة (Fr)',
            lng: 'fr',
            required: false,
        },
        {
            name: 'descriptionEn',
            sm: 12,
            md: 12,
            label: 'وصف الوثيقة (En)',
            placeholder: 'وصف الوثيقة (En)',
            lng: 'en',
            required: false,
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
