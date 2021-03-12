/**
 *
 *
 * @param {*} listTheme
 * @param {*} listSujet
 * @returns
 */
const setListInput = (listTheme, listSujet) => {
    return [
        {
            name: 'theme',
            sm: 6,
            md: 6,
            label: 'المحور',
            placeholder: 'المحور',
            isSelect: true,
            list: listTheme,
        },
        {
            name: 'sujet',
            sm: 6,
            md: 6,
            label: 'الموضوع',
            placeholder: 'الموضوع',
            isSelect: true,
            required: false,
            list: listSujet,
        },
        {
            name: 'questionAr',
            sm: 6,
            md: 4,
            label: 'السؤال (Ar)',
            placeholder: 'السؤال (Ar)',
            lng: 'ar',
        },
        {
            name: 'questionFr',
            sm: 6,
            md: 4,
            label: 'السؤال (Fr)',
            placeholder: 'السؤال (Fr)',
            lng: 'fr',
        },
        {
            name: 'questionEn',
            sm: 6,
            md: 4,
            label: 'السؤال (En)',
            placeholder: 'السؤال (En)',
            lng: 'en',
        },
        {
            name: 'reponseAr',
            sm: 12,
            md: 12,
            label: 'الاجابة (Ar)',
            placeholder: 'الاجابة (Ar)',
            isTextErea: true,
        },
        {
            name: 'reponseFr',
            sm: 12,
            md: 12,
            label: 'الاجابة (Fr)',
            placeholder: 'الاجابة (Fr)',
            isTextErea: true,
        },
        {
            name: 'reponseEn',
            sm: 12,
            md: 12,
            label: 'الاجابة (En)',
            placeholder: 'الاجابة (En)',
            isTextErea: true,
        },
    ]
}

export default setListInput
