/**
 *
 *
 * @param {*} intl
 * @returns
 */
const ListCheckBox = intl => {
    return [
        {
            name: 'publierNom',
            label: intl.formatMessage({ id: 'nomDeclarantRevenus' }),
        },
        {
            name: 'publierType',
            label: intl.formatMessage({ id: 'typeImmeuble' }),
        },
        {
            name: 'publierSurface',
            label: intl.formatMessage({ id: 'surface' }),
        },
        {
            name: 'publierAdresse',
            label: intl.formatMessage({ id: 'labelAddressimmeuble' }),
        },
        {
            name: 'publierGouvernorat',
            label: intl.formatMessage({ id: 'labelGouvernorat' }),
        },
        {
            name: 'publierCodePostale',
            label: intl.formatMessage({ id: 'labelCodePostal' }),
        },
        {
            name: 'publierDateAcquisation',
            label: intl.formatMessage({ id: 'dateAcquisation' }),
        },
        {
            name: 'publierMoyenAcquisation',
            label: intl.formatMessage({ id: 'moyenAcquisation' }),
        },
        {
            name: 'publierValeur',
            label: intl.formatMessage({ id: 'valeur' }),
        },
        {
            name: 'publierValeurChiffre',
            label: intl.formatMessage({ id: 'valeurChiffre' }),
        },
        {
            name: 'publierStatutJuridique',
            label: intl.formatMessage({ id: 'statutJuridique' }),
        },
        {
            name: 'publierImmatriculationFonciere',
            label: intl.formatMessage({ id: 'immatriculationFonciere' }),
        },
        {
            name: 'publierPartProprietaire',
            label: intl.formatMessage({ id: 'partProprietaire' }),
        },
    ]
}

export default ListCheckBox
