/**
 *
 *
 * @param {*} intl
 * @param {*} listGov
 * @param {*} listCodePostalResidence
 * @param {*} listDelegation
 * @returns
 */
const ListInput = (intl, listGov, listCodePostalResidence, listDelegation) => {
    return [
        {
            name: 'nature',
            sm: 6,
            md: 4,
            label: intl.formatMessage({ id: 'natureAct' }),
            placeholder: intl.formatMessage({ id: 'natureAct' }),
        },
        {
            name: 'matriculeFiscale',
            sm: 6,
            md: 8,
            label: intl.formatMessage({ id: 'matriculeFiscale' }),
            placeholder: intl.formatMessage({ id: 'matriculeFiscale' }),
            type: 'number',
            isFormatted: true,
        },
        {
            name: 'adresse',
            placeholder: intl.formatMessage({ id: 'adresseTr' }),
            label: intl.formatMessage({ id: 'adresseTr' }),
            sm: 12,
            md: 8,
        },
        {
            name: 'gouvernorat',
            label: intl.formatMessage({ id: 'labelGouvernorat' }),
            list: listGov,
            isSelect: true,
            sm: 6,
            md: 4,
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
            list: listCodePostalResidence,
            isSelect: true,
            required: false,
            sm: 6,
            md: 4,
        },
        /*
         * pour input datePriseFonction
         */
        {
            name: 'datePriseFonction',
            label: intl.formatMessage({ id: 'datePriseFonctionTr' }),
            list: listCodePostalResidence,
            isDate: true,
            sm: 6,
            md: 4,
        },
        /*
         * pour input dateFinFonction
         */
        {
            name: 'dateFinFonction',
            label: intl.formatMessage({ id: 'dateFinFonctionTr' }),
            list: listCodePostalResidence,
            isDate: true,
            sm: 6,
            md: 4,
            attributes: { disableFuture: false },
        },
    ]
}

export default ListInput
