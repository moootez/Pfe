/**
 *
 *
 * @param {*} intl
 * @param {*} listDeclarant
 * @param {*} listType
 * @param {*} listDevise
 * @returns
 */
const ListInput = (intl, listDeclarant, listType, listDevise) => {
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
            name: 'typeValeur',
            sm: 6,
            md: 4,
            list: listType,
            isSelect: true,
            label: intl.formatMessage({ id: 'typeValeurs' }),
        },
        {
            name: 'valeurDateAcquisation',
            label: intl.formatMessage({ id: 'valeurV' }),
            sm: 6,
            md: 4,
            type: 'number',
            placeholder: intl.formatMessage({ id: 'valeurV' }),
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
