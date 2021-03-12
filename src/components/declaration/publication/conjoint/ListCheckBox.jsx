const ListCheckBox = intl => {
    return [
        {
            name: 'publierPrenomTripartite',
            sm: 6,
            md: 4,
            label: intl.formatMessage({ id: 'labelPrenomTri' }),
        },
        {
            name: 'publierNom',
            sm: 6,
            md: 4,
            label: intl.formatMessage({ id: 'labelNom' }),
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
        {
            name: 'publierNationalite',
            label: intl.formatMessage({ id: 'labelNationalite' }),
            sm: 6,
            md: 4,
        },

        {
            name: 'publierNumPassport',
            md: 4,
            label: intl.formatMessage({ id: 'labelNumeroPasseport' }),
            sm: 6,
        },
        {
            name: 'publierNumCin',
            label: intl.formatMessage({ id: 'labelNumeroCIN' }),
            md: 4,
            sm: 6,
        },
        {
            name: 'publierFonction',
            label: intl.formatMessage({ id: 'fonction' }),
            sm: 6,
            md: 4,
        },
    ]
}

export default ListCheckBox
