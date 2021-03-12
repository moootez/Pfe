/**
 *
 *
 * @param {*} intl
 * @param {*} listDeclarant
 * @returns
 */
const ListInput = (intl, listDeclarant) => {
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
            name: 'organe',
            label: intl.formatMessage({ id: 'organe' }),
            sm: 6,
            md: 4,
            placeholder: intl.formatMessage({ id: 'organe' }),
        },
        {
            name: 'domaine',
            label: intl.formatMessage({ id: 'domaine' }),
            sm: 6,
            md: 4,
            placeholder: intl.formatMessage({ id: 'domaine' }),
        },
        {
            name: 'annee',
            label: intl.formatMessage({ id: 'annee' }),
            sm: 6,
            md: 4,
            isFormatted: true,
        },
        /*
         * pour input poste
         */
        {
            name: 'poste',
            label: intl.formatMessage({ id: 'posteItnr' }),
            sm: 6,
            md: 4,
            placeholder: intl.formatMessage({ id: 'posteItnr' }),
        },
    ]
}

export default ListInput
