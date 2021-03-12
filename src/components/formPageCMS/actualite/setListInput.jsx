/**
 *
 *
 * @returns
 */
const setListInput = () => {
    return [
        {
            name: 'titreAr',
            sm: 6,
            md: 4,
            label: 'عنوان المقال (Ar)',
            placeholder: 'عنوان المقال (Ar)',
            lng: 'ar',
        },
        {
            name: 'titreFr',
            sm: 6,
            md: 4,
            label: 'عنوان المقال (Fr)',
            placeholder: 'عنوان المقال (Fr)',
            lng: 'fr',
        },
        {
            name: 'titreEn',
            sm: 6,
            md: 4,
            label: 'عنوان المقال (En)',
            placeholder: 'عنوان المقال (En)',
            lng: 'en',
        },
        {
            name: 'contenuAr',
            sm: 12,
            md: 12,
            label: 'النص (Ar)',
            placeholder: 'النص (Ar)',
            lng: 'ar',
            required: false,
            isTextErea: true,
        },
        {
            name: 'contenuFr',
            sm: 12,
            md: 12,
            label: 'النص (Fr)',
            placeholder: 'النص (Fr)',
            lng: 'fr',
            required: false,
            isTextErea: true,
        },
        {
            name: 'contenuEn',
            sm: 12,
            md: 12,
            label: 'النص (En)',
            placeholder: 'النص (En)',
            lng: 'en',
            required: false,
            isTextErea: true,
        },
        {
            name: 'dateActualite',
            label: 'التاريخ',
            isDate: true,
            type: 'date',
            // props: {
            //     disableFuture: false,
            // },
            sm: 6,
            md: 4,
        },
        {
            name: 'image',
            sm: 6,
            md: 4,
            label: 'تحميل صورة',
            placeholder: 'تحميل صورة',
            type: 'file',
        },
    ]
}

export default setListInput
