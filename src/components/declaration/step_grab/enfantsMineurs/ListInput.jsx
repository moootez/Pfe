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
        /*
         * pour input prenomTripartite
         */
        {
            name: 'prenomTripartite',
            sm: 6,
            md: 4,
            label: intl.formatMessage({ id: 'labelPrenom' }),
            placeholder: intl.formatMessage({ id: 'labelPrenom' }),
        },
        /*
         * pour input nom
         */
        {
            name: 'nom',
            sm: 6,
            md: 4,
            label: intl.formatMessage({ id: 'labelNom' }),
            placeholder: intl.formatMessage({ id: 'labelNom' }),
        },
        {
            name: 'lieuNaissance',
            placeholder: intl.formatMessage({ id: 'labelLieudenaissance' }),
            label: intl.formatMessage({ id: 'labelLieudenaissance' }),
            sm: 6,
            md: 4,
        },
        /*
         * pour input dateNaissance
         */
        {
            name: 'dateNaissance',
            label: intl.formatMessage({ id: 'labelDatedenaissance' }),
            isDate: true,
            parent: 'child',
            sm: 6,
            md: 4,
        },
        /*
         * pour input adresseResidence
         */
        {
            name: 'adresseResidence',
            label: intl.formatMessage({ id: 'labelAddressResidence' }),
            placeholder: intl.formatMessage({ id: 'labelAddressResidence' }),
            sm: 12,
            md: 8,
        },
        /*
         * pour input gouvernoratResidence
         */
        {
            name: 'gouvernoratResidence',
            label: intl.formatMessage({ id: 'labelGouvernorat' }),
            list: listGov,
            isSelect: true,
            sm: 6,
            md: 4,
        },
        /*
         * pour input delegationResidence
         */
        {
            name: 'delegationResidence',
            label: intl.formatMessage({ id: 'labelDelegation' }),
            list: listDelegation,
            isSelect: true,
            sm: 6,
            md: 4,
        },
        /*
         * pour input codePostaleResidence
         */
        {
            name: 'codePostaleResidence',
            label: intl.formatMessage({ id: 'labelCodePostal' }),
            list: listCodePostalResidence,
            isSelect: true,
            required: false,
            sm: 6,
            md: 4,
        },
    ]
}

export default ListInput
