const ListCheckBox = intl => {
    return [
        {
            name: 'publierNom',
            label: intl.formatMessage({ id: 'nomDeclarantRevenus' }),
        },
        {
            name: 'publierNatureRevenue',
            label: intl.formatMessage({ id: 'natureReveunus' }),
        },
        {
            name: 'publierSource',
            label: intl.formatMessage({ id: 'sourecRevenus' }),
        },
        {
            name: 'publierPreuveJustificative',
            label: intl.formatMessage({ id: 'preuveJus' }),
        },
        {
            name: 'publierMontant',
            label: intl.formatMessage({ id: 'MontantToltal' }),
        },
        {
            name: 'publierTypeDevise',
            label: intl.formatMessage({ id: 'typeDivise' }),
        },
    ]
}

export default ListCheckBox
