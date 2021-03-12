/**
 *
 *
 * @param {*} intl
 * @param {*} listSocieteAssurance
 * @param {*} listDeclarant
 * @param {*} listDevise
 * @returns
 */
const ListInput = (intl, listSocieteAssurance, listDeclarant, listDevise) => {
    return [
        /*
         * pour input societeAssurance
         */
        {
            name: 'societeAssurance',
            sm: 6,
            md: 4,
            list: listSocieteAssurance,
            isSelect: true,
            label: intl.formatMessage({ id: 'societeAssurance' }),
        },
        /*
         * pour input assure
         */
        {
            name: 'assure',
            label: intl.formatMessage({ id: 'assure' }),
            sm: 6,
            md: 4,
            placeholder: intl.formatMessage({ id: 'assure' }),
        },
        /*
         * pour input beneficiaires
         */
        {
            name: 'beneficiaires',
            label: intl.formatMessage({ id: 'beneficiaires' }),
            sm: 6,
            md: 4,
            placeholder: intl.formatMessage({ id: 'beneficiaires' }),
        },
        /*
         * pour input montant
         */
        {
            name: 'montant',
            label: intl.formatMessage({ id: 'montantAss' }),
            sm: 6,
            md: 4,
            type: 'number',
            placeholder: intl.formatMessage({ id: 'montantAss' }),
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
        /*
         * pour input prime
         */
        {
            name: 'prime',
            label: intl.formatMessage({ id: 'prime' }),
            sm: 6,
            md: 4,
            placeholder: intl.formatMessage({ id: 'prime' }),
        },
    ]
}

export default ListInput
