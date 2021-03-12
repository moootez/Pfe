/**
 *
 *
 * @param {*} intl
 * @param {*} listDeclarant
 * @param {*} listSociete
 * @param {*} listNature
 * @param {*} listDevise
 * @returns
 */
const ListInput = (
    intl,
    listDeclarant,
    listSociete,
    listNature,
    listDevise
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
        /*
         * pour input societeEmettrice
         */
        {
            name: 'societeEmettrice',
            label: intl.formatMessage({ id: 'societeEmettricePret' }),
            sm: 6,
            md: 4,
            list: listSociete,
            isSelect: true,
        },
        {
            name: 'valeur',
            label: intl.formatMessage({ id: 'valeurPret' }),
            sm: 6,
            md: 4,
            type: 'number',
            placeholder: intl.formatMessage({ id: 'valeurPret' }),
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
        {
            name: 'nature',
            label: intl.formatMessage({ id: 'naturePret' }),
            sm: 6,
            md: 4,
            list: listNature,
            isSelect: true,
        },
        /*
         * pour input montant
         */
        {
            name: 'montant',
            label: intl.formatMessage({ id: 'montantPret' }),
            sm: 6,
            md: 4,
            type: 'number',
            placeholder: intl.formatMessage({ id: 'montantPret' }),
            isFormatted: true,
        },
        {
            name: 'typeDeviseRestant',
            label: intl.formatMessage({ id: 'typeDivise' }),
            list: listDevise,
            isSelect: true,
            sm: 6,
            md: 4,
        },
        {
            name: 'dureeRemboursement',
            label: intl.formatMessage({ id: 'dureeRemboursement' }),
            sm: 6,
            md: 4,
            type: 'number',
            placeholder: intl.formatMessage({ id: 'dureeRemboursement' }),
        },
        {
            name: 'dateRemboursement',
            label: intl.formatMessage({ id: 'dateRemboursement' }),
            sm: 6,
            md: 4,
            isDate: true,
        },
    ]
}

export default ListInput
