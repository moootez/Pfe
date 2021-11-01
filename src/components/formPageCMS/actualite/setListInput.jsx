/**
 *
 *
 * @returns
 */
const setListInput = () => {
    return [
        {
            name: 'titre',
            sm: 6,
            md: 4,
            label: 'Titre',
            placeholder: 'Titre',
            lng: 'fr',
        },
        {
            name: 'texte',
            sm: 6,
            md: 9,
            label: 'Texte',
            placeholder: 'Texte',
            lng: 'fr',
        },

        {
            name: 'priorite',
            required: true,
            label: 'PRIORITE(ordre décroissant)',
            list: [
                {
                    label: '1',
                    value: 1,
                },
                {
                    label: '2',
                    value: 2,
                },
                {
                    label: '3',
                    value: 3,
                },
                {
                    label: '4',
                    value: 4,
                },
                {
                    label: '5',
                    value: 5,
                },
                {
                    label: '6',
                    value: 6,
                },
            ],
            isSelect: true,
            selectAll: true,
            sm: 6,
            md: 3,
            placeholder: 'Priorité',
            lng: 'fr',
        },

        /* {
            name: 'dateActualite',
            label: 'Date Publication',
            isDate: true,
            type: 'date',
            // props: {
            //     disableFuture: false,
            // },
            sm: 6,
            md: 4,
        }, */
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
