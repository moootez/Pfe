/**
 *
 *
 * @param {*} intl
 * @param {*} listDeclarant
 * @param {*} listDevise
 * @returns
 */
const ListInput = (intl, listDeclarant, listDevise) => {
    return [
        /*
         * pour input nom
         */
        {
            name: 'nom',
            sm: 6,
            md: 4,
            list: listDeclarant,
            isSelect: true,
            label: intl.formatMessage({ id: 'nomDeclarantRevenus' }),
        },
        {
            name: 'cadeau',
            label: intl.formatMessage({ id: 'cadeau' }),
            sm: 6,
            md: 4,
            placeholder: intl.formatMessage({ id: 'cadeau' }),
        },
        {
            name: 'donneur',
            label: intl.formatMessage({ id: 'donneur' }),
            sm: 6,
            md: 4,
            placeholder: intl.formatMessage({ id: 'donneur' }),
        },
        {
            name: 'valeur',
            label: intl.formatMessage({ id: 'valeurCadeau' }),
            sm: 6,
            md: 4,
            type: 'number',
            placeholder: intl.formatMessage({ id: 'valeurCadeau' }),
            isFormatted: true,
        },
        /*
         * pour input typeDevise
         */
        {
            name: 'typeDevise',
            label: intl.formatMessage({ id: 'labelDevise' }),
            list: listDevise,
            isSelect: true,
            sm: 6,
            md: 4,
        },
    ]
}

export default ListInput
