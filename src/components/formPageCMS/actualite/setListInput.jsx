/**
 *
 *
 * @returns
 */
const setListInput = () => {
    return [
        {
            name: 'texte',
            sm: 6,
            md: 4,
            label: 'Texte',
            placeholder: 'Texte',
            lng: 'fr',
        },

        {
            name: 'priorite',
            sm: 6,
            md: 4,
            label: 'Priorite',
            placeholder: 'Priorite',
            lng: 'fr',
            required: false,
        },
        {
            name: 'dateActualite',
            label: 'Date Création',
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
            label: 'Télécharger une image',
            placeholder: 'Télécharger une image',
            type: 'file',
        },
    ]
}

export default setListInput
