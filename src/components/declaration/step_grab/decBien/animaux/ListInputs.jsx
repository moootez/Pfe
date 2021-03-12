/**
 *
 *
 * @param {*} intl
 * @param {*} listDeclarant
 * @param {*} listType
 * @param {*} listMoyen
 * @param {*} listDevise
 * @returns
 */
const ListInput = (intl, listDeclarant, listType, listMoyen, listDevise) => {
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
            name: 'type',
            label: intl.formatMessage({ id: 'type' }),
            list: listType,
            isSelect: true,
            sm: 6,
            md: 4,
        },
        {
            name: 'nombre',
            label: intl.formatMessage({ id: 'nombre' }),
            sm: 6,
            md: 4,
            type: 'number',
        },
        {
            name: 'valeurApproximative',
            label: intl.formatMessage({ id: 'valeurApproximative' }),
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
            list: listDevise,
            isSelect: true,
            sm: 6,
            md: 4,
        },
    ]
}

export default ListInput
