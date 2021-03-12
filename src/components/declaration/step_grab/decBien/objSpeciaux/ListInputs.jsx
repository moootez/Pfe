/**
 *
 *
 * @param {*} intl
 * @param {*} listDeclarant
 * @param {*} listNature
 * @param {*} listMoyen
 * @param {*} listDevise
 * @returns
 */
const ListInput = (intl, listDeclarant, listNature, listMoyen, listDevise) => {
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
            name: 'nature',
            label: intl.formatMessage({ id: 'natureObjSpec' }),
            list: listNature,
            isSelect: true,
            sm: 6,
            md: 4,
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
            name: 'valeurDateAcquisation',
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
            label: intl.formatMessage({ id: 'typeDivise' }),
            list: listDevise,
            isSelect: true,
            sm: 6,
            md: 4,
        },
    ]
}

export default ListInput
