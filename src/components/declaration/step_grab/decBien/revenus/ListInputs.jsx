/**
 *
 *
 * @param {*} intl
 * @param {*} listDeclarant
 * @param {*} listNature
 * @param {*} listJustification
 * @param {*} listDivise
 * @returns
 */
const ListInput = (
    intl,
    listDeclarant,
    listNature,
    listJustification,
    listDivise
) => {
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
            name: 'natureRevenue',
            label: intl.formatMessage({ id: 'natureReveunus' }),
            list: listNature,
            isSelect: true,
            sm: 6,
            md: 4,
        },
        {
            name: 'source',
            sm: 6,
            md: 4,
            label: intl.formatMessage({ id: 'sourecRevenus' }),
            placeholder: intl.formatMessage({ id: 'sourecRevenus' }),
        },
        {
            name: 'preuveJustificative',
            label: intl.formatMessage({ id: 'preuveJus' }),
            sm: 6,
            md: 4,
            required: false,
            list: listJustification,
            isSelect: true,
        },
        /*
         * pour input montant
         */
        {
            name: 'montant',
            label: intl.formatMessage({ id: 'MontantToltal' }),
            sm: 6,
            md: 4,
            type: 'number',
            placeholder: intl.formatMessage({ id: 'MontantToltal' }),
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
