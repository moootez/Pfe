/**
 *
 *
 * @param {*} intl
 * @param {*} listDeclarant
 * @param {*} listTypeFonts
 * @param {*} listGov
 * @param {*} listCodePostalResidence
 * @param {*} listDelegation
 * @param {*} listDevise
 * @returns
 */
const ListInput = (
    intl,
    listDeclarant,
    listTypeFonts,
    listGov,
    listCodePostalResidence,
    listDelegation,
    listDevise
) => {
    return [
        /*
         * pour input nom
         */
        {
            name: 'nom',
            sm: 6,
            md: 8,
            list: listDeclarant,
            isSelect: true,
            label: intl.formatMessage({ id: 'nomDeclarantRevenus' }),
        },
        {
            name: 'type',
            label: intl.formatMessage({ id: 'typeFont' }),
            list: listTypeFonts,
            isSelect: true,
            sm: 6,
            md: 4,
        },
        {
            name: 'adresse',
            label: intl.formatMessage({ id: 'adresse' }),
            placeholder: intl.formatMessage({ id: 'adresse' }),
            sm: 6,
            md: 8,
        },
        {
            name: 'gouvernorat',
            label: intl.formatMessage({ id: 'labelGouvernorat' }),
            sm: 6,
            md: 4,
            list: listGov,
            isSelect: true,
        },
        {
            name: 'delegation',
            label: intl.formatMessage({ id: 'labelDelegation' }),
            list: listDelegation,
            isSelect: true,
            sm: 6,
            md: 4,
        },
        {
            name: 'codePostale',
            label: intl.formatMessage({ id: 'labelCodePostal' }),
            sm: 6,
            md: 4,
            list: listCodePostalResidence,
            required: false,
            isSelect: true,
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
