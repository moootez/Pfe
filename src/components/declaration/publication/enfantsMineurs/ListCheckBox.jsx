/**
 *
 *
 * @param {*} intl
 * @returns
 */
const ListCheckBox = intl => {
    return [
        {
            name: 'publierPrenomTripartite',
            sm: 6,
            md: 4,
            label: intl.formatMessage({ id: 'labelPrenom' }),
        },
        {
            name: 'publierNom',
            sm: 6,
            md: 4,
            label: intl.formatMessage({ id: 'labelNom' }),
        },
        {
            name: 'publierLieuNaissance',
            label: intl.formatMessage({ id: 'labelLieudenaissance' }),
            sm: 6,
            md: 4,
        },
        {
            name: 'publierDateNaissance',
            label: intl.formatMessage({ id: 'labelDatedenaissance' }),
            sm: 6,
            md: 4,
        },
        {
            name: 'publierAdresseResidence',
            label: intl.formatMessage({ id: 'labelAddressResidence' }),
            sm: 12,
            md: 8,
        },
        {
            name: 'publierGouvernoratResidence',
            label: intl.formatMessage({ id: 'labelGouvernorat' }),
            sm: 6,
            md: 4,
        },
        {
            name: 'publierCodePostaleResidence',
            label: intl.formatMessage({ id: 'labelCodePostal' }),
            sm: 6,
            md: 4,
        },
    ]
}

export default ListCheckBox
