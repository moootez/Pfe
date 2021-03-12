/**
 *
 *
 * @param {*} intl
 * @param {*} listDeclarant
 * @param {*} listEtablissement
 * @param {*} listDivise
 * @param {*} listNatureCompte
 * @returns
 */
const ListInput = (
    intl,
    listDeclarant,
    listEtablissement,
    listDivise,
    listNatureCompte
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
         * pour input etablissement
         */
        {
            name: 'etablissement',
            label: intl.formatMessage({ id: 'etablissement' }),
            list: listEtablissement,
            isSelect: true,
            sm: 6,
            md: 4,
        },
        {
            name: 'natureCompte',
            label: intl.formatMessage({ id: 'natureCompte' }),
            sm: 6,
            md: 4,
            list: listNatureCompte,
            isSelect: true,
        },
        {
            name: 'soldeDateDeclaration',
            label: intl.formatMessage({ id: 'soldeDateDeclaration' }),
            placeholder: intl.formatMessage({ id: 'soldeDateDeclaration' }),
            sm: 6,
            md: 8,
            type: 'number',
        },
        /*
         * pour input typeDevise
         */
        {
            name: 'typeDevise',
            label: intl.formatMessage({ id: 'typeDivise' }),
            sm: 6,
            md: 4,
            list: listDivise,
            isSelect: true,
        },
    ]
}

export default ListInput
