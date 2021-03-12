/**
 *
 *
 * @param {*} intl
 * @returns
 */
const ListCheckBox = intl => {
    return [
        {
            name: 'publierNomAr',
            label: intl.formatMessage({ id: 'labelNom' }),
        },

        {
            name: 'publierPrenomTripartiteAr',
            label: intl.formatMessage({ id: 'labelPrenomTri' }),
        },
        {
            name: 'publierNumCin',
            label: intl.formatMessage({ id: 'labelNumeroCIN' }),
        },
        {
            name: 'publierDatDelivranceCin',
            label: intl.formatMessage({ id: 'labelDatededelivrance' }),
        },
        {
            name: 'publierDateNaissance',
            label: intl.formatMessage({ id: 'labelDatedenaissance' }),
        },
        {
            name: 'publierDateDeclaration',
            label: intl.formatMessage({ id: 'dateDec' }),
        },
        {
            name: 'publierAdresseNaissance',
            label: intl.formatMessage({ id: 'labelLieudenaissance' }),
        },
        {
            name: 'publierNationalite',
            label: intl.formatMessage({ id: 'labelNationalite' }),
        },
        {
            name: 'publierSituationCivile',
            label: intl.formatMessage({ id: 'labelStatutCivile' }),
        },
        {
            name: 'publierAdresseResidence',
            label: intl.formatMessage({ id: 'labelAddressResidence' }),
        },
        {
            name: 'publierCategorie',
            label: intl.formatMessage({ id: 'categorie' }),
        },
        {
            name: 'publierEtablissement',
            label: intl.formatMessage({ id: 'etablissement' }),
        },
        {
            name: 'publierAdresseEtablissement',
            label: intl.formatMessage({ id: 'adressEtablissement' }),
        },
        {
            name: 'publierSexe',
            label: intl.formatMessage({ id: 'labelSexe' }),
        },
    ]
}

export default ListCheckBox
