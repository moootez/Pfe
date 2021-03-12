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
        /*
         * pour input natureValeur
         */
        {
            name: 'natureValeur',
            label: intl.formatMessage({ id: 'natureValeur' }),
            list: listNature,
            isSelect: true,
            sm: 6,
            md: 4,
        },
        /*
         * pour input societeEmettrice
         */
        {
            name: 'societeEmettrice',
            label: intl.formatMessage({ id: 'societeEmettrice' }),
            sm: 6,
            md: 4,
        },
        /*
         * pour input nbreValeur
         */
        {
            name: 'nbreValeur',
            label: intl.formatMessage({ id: 'nbreValeur' }),
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
        /*
         * pour input valeurTotaleDateAcquisation
         */
        {
            name: 'valeurTotaleDateAcquisation',
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
    ]
}

export default ListInput
