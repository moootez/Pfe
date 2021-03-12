/**
 *
 *
 * @param {*} intl
 * @param {*} listDeclarant
 * @param {*} listType
 * @param {*} listMoyen
 * @param {*} listDevise
 * @returns
 */
const ListInput = (intl, listDeclarant, listType, listMoyen, listDevise) => {
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
            name: 'marque',
            label: intl.formatMessage({ id: 'marque' }),
            sm: 6,
            md: 4,
        },
        {
            name: 'type',
            label: intl.formatMessage({ id: 'typeVehicule' }),
            list: listType,
            isSelect: true,
            sm: 6,
            md: 4,
        },
        {
            name: 'puissance',
            label: intl.formatMessage({ id: 'puissance' }),
            sm: 6,
            md: 4,
            type: 'number',
        },
        /*
         * pour input dateAcquisation
         */
        {
            name: 'dateAcquisation',
            label: intl.formatMessage({ id: 'dateAcquisationV' }),
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
            name: 'valeurAcquisation',
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
        {
            name: 'immatriculation',
            label: intl.formatMessage({ id: 'immatriculation' }),
            sm: 6,
            md: 4,
            placeholder: intl.formatMessage({ id: 'immatriculation' }),
        },
        {
            name: 'dateCirculation',
            label: intl.formatMessage({ id: 'dateCirculation' }),
            isDate: true,
            sm: 6,
            md: 4,
        },
        {
            name: 'lieuExistance',
            label: intl.formatMessage({ id: 'lieuExistance' }),
            placeholder: intl.formatMessage({ id: 'lieuExistance' }),
            sm: 6,
            md: 4,
        },
    ]
}

export default ListInput
