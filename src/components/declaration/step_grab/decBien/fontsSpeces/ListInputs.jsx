/**
 *
 *
 * @param {*} intl
 * @param {*} listDeclarant
 * @param {*} listDivise
 * @returns
 */
const ListInput = (intl, listDeclarant, listDivise) => {
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
        /*
         * pour input montant
         */
        {
            name: 'montant',
            label: intl.formatMessage({ id: 'montant' }),
            placeholder: intl.formatMessage({ id: 'montant' }),
            sm: 6,
            md: 4,
            type: 'number',
            isFormatted: true,
        },
        /*
         * pour input typeDevise
         */
        {
            name: 'typeDevise',
            label: intl.formatMessage({ id: 'typeDivise' }),
            sm: 6,
            md: 4,
            list: listDivise,
            isSelect: true,
        },
    ]
}

export default ListInput
