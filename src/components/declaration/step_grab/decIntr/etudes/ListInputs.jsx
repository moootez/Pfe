/**
 *
 *
 * @param {*} intl
 * @returns
 */
const ListInput = intl => {
    return [
        /*
         * pour input societe
         */
        {
            name: 'societe',
            label: intl.formatMessage({ id: 'societe' }),
            sm: 6,
            md: 4,
            placeholder: intl.formatMessage({ id: 'societe' }),
        },
        {
            name: 'annee',
            label: intl.formatMessage({ id: 'annee' }),
            sm: 6,
            md: 4,
            type: 'number',
            placeholder: intl.formatMessage({ id: 'annee' }),
            isFormatted: true,
        },
        {
            name: 'nature',
            label: intl.formatMessage({ id: 'natureAct' }),
            sm: 6,
            md: 4,
            placeholder: intl.formatMessage({ id: 'natureAct' }),
        },
    ]
}

export default ListInput
