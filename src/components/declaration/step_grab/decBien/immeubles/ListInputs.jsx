/**
 *
 *
 * @param {*} intl
 * @param {*} listDeclarant
 * @param {*} listGov
 * @param {*} listCodePostalResidence
 * @param {*} listType
 * @param {*} listMoyen
 * @param {*} listStatusJuridique
 * @param {*} listDelegation
 * @param {*} listDevise
 * @param {*} listSurfaceUnit
 * @returns
 */
const ListInput = (
    intl,
    listDeclarant,
    listGov,
    listCodePostalResidence,
    listType,
    listMoyen,
    listStatusJuridique,
    listDelegation,
    listDevise,
    listSurfaceUnit
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
            name: 'type',
            label: intl.formatMessage({ id: 'typeImmeuble' }),
            list: listType,
            isSelect: true,
            sm: 6,
            md: 4,
        },
        {
            name: 'surface',
            sm: 6,
            md: 4,
            type: 'number',
            label: intl.formatMessage({ id: 'surface' }),
            placeholder: intl.formatMessage({ id: 'surface' }),
        },
        {
            name: 'surfaceUnit',
            label: intl.formatMessage({ id: 'surfaceUnit' }),
            placeholder: intl.formatMessage({ id: 'surfaceUnit' }),
            list: listSurfaceUnit,
            isSelect: true,
            sm: 6,
            md: 4,
        },
        {
            name: 'adresse',
            label: intl.formatMessage({ id: 'labelAddressimmeuble' }),
            placeholder: intl.formatMessage({ id: 'labelAddressimmeuble' }),
            sm: 6,
            md: 4,
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
         * pour input dateAcquisation
         */
        {
            name: 'dateAcquisation',
            label: intl.formatMessage({ id: 'dateAcquisation' }),
            isDate: true,
            sm: 6,
            md: 4,
        },
        /*
         * pour input moyenAcquisation
         */
        {
            name: 'moyenAcquisation',
            label: intl.formatMessage({ id: 'moyenAcquisation' }),
            sm: 6,
            md: 4,
            list: listMoyen,
            isSelect: true,
        },
        {
            name: 'valeur',
            label: intl.formatMessage({ id: 'valeur' }),
            sm: 6,
            md: 4,
            placeholder: intl.formatMessage({ id: 'valeur' }),
        },
        {
            name: 'valeurChiffre',
            label: intl.formatMessage({ id: 'valeurChiffre' }),
            sm: 6,
            md: 4,
            type: 'number',
            placeholder: intl.formatMessage({ id: 'valeurChiffre' }),
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
        {
            name: 'statutJuridique',
            label: intl.formatMessage({ id: 'statutJuridique' }),
            sm: 6,
            md: 4,
            list: listStatusJuridique,
            isSelect: true,
        },
        {
            name: 'immatriculationFonciere',
            label: intl.formatMessage({ id: 'immatriculationFonciere' }),
            sm: 6,
            md: 4,
            placeholder: intl.formatMessage({ id: 'immatriculationFonciere' }),
            required: false,
        },
        {
            name: 'partProprietaire',
            label: intl.formatMessage({ id: 'partProprietaire' }),
            sm: 6,
            md: 4,
            placeholder: intl.formatMessage({ id: 'partProprietaire' }),
        },
    ]
}

export default ListInput
