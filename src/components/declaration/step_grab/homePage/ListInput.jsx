/**
 *
 *
 * @param {*} intl
 * @param {*} listFonction
 * @param {*} listCategorie
 * @param {*} type
 * @param {*} listStatus
 * @param {*} listMinistere
 * @param {*} listEtablissement
 * @param {*} listStatusPublication
 * @param {*} listStatusPublicationDec
 * @param {*} listStatusDeclarant
 * @param {*} listStatusInscription
 * @param {*} listEtablissementFiltred
 * @param {*} listRoles
 * @param {*} listStatusCoursDesComptes
 * @returns
 */
const ListInput = (
    intl,
    listFonction,
    listCategorie,
    type,
    listStatus,
    listMinistere,
    listEtablissement,
    listStatusPublication,
    listStatusPublicationDec,
    listStatusDeclarant,
    listStatusInscription,
    listEtablissementFiltred,
    listRoles,
    listStatusCoursDesComptes
) => {
    if (type === 'user')
        return [
            {
                name: 'role',
                label: intl.formatMessage({ id: 'role' }),
                sm: 6,
                md: 6,
                list: listRoles,
                isSelect: true,
                required: false,
            },
        ]
    if (type === 'publicationEtablissement')
        return [
            {
                name: 'ministere',
                label: intl.formatMessage({ id: 'listMinistere' }),
                sm: 6,
                md: 4,
                list: listMinistere,
                isSelect: true,
                required: false,
            },
            {
                name: 'etablissement',
                label: intl.formatMessage({ id: 'listEtablissement' }),
                sm: 6,
                md: 4,
                list: listEtablissementFiltred,
                isSelect: true,
                required: false,
            },
            {
                name: 'published',
                label: intl.formatMessage({ id: 'stautPublication' }),
                sm: 6,
                md: 4,
                list: listStatus,
                isSelect: true,
                required: false,
            },
        ]
    if (type === 'validationAssujetti')
        return [
            {
                name: 'ministere',
                label: intl.formatMessage({ id: 'listMinistere' }),
                sm: 6,
                md: 4,
                list: listMinistere,
                isAutoComplete: true,
                required: false,
            },
            {
                name: 'etablissement',
                label: intl.formatMessage({ id: 'listEtablissement' }),
                sm: 8,
                md: 8,
                list: listEtablissement,
                isAutoComplete: true,
                required: false,
            },
        ]
    if (type === 'saisieAssujetti')
        return [
            {
                name: 'ministere',
                label: intl.formatMessage({ id: 'listMinistere' }),
                sm: 6,
                md: 4,
                list: listMinistere,
                isSelect: true,
                required: false,
            },
        ]
    return [
        {
            name: 'dateDepot',
            sm: 6,
            md: 6,
            label: intl.formatMessage({ id: 'de' }),
            isDate: true,
            required: false,
        },
        /*
         * pour input dateFin
         */
        {
            name: 'dateFin',
            sm: 6,
            md: 6,
            isDate: true,
            label: intl.formatMessage({ id: 'jusqua' }),
            required: false,
        },
        /*
         * pour input categorie
         */
        {
            name: 'categorie',
            label: intl.formatMessage({ id: 'categorie' }),
            sm: 6,
            md: 6,
            list: listCategorie,
            multiple: true,
            required: false,
        },
        /*
         * pour input fonction
         */
        {
            name: 'fonction',
            label: intl.formatMessage({ id: 'poste' }),
            sm: 6,
            md: 6,
            list: listFonction,
            multiple: true,
            required: false,
        },

        type === 'publication' && {
            name: 'typeDeclarations',
            label: intl.formatMessage({ id: 'typeDeclaration' }),
            sm: 6,
            md: 4,
            list: listStatus,
            isSelect: true,
            required: false,
        },
        type === 'publication' && {
            name: 'published',
            label: intl.formatMessage({ id: 'stautPublication' }),
            sm: 6,
            md: 4,
            list: listStatusPublication,
            isSelect: true,
            required: false,
        },
        type === 'publierDeclarant' && {
            name: 'publishedDeclarant',
            label: intl.formatMessage({ id: 'stautPublication' }),
            sm: 6,
            md: 4,
            list: listStatusPublicationDec,
            isSelect: true,
            required: false,
        },
        (type === 'affectation' ||
            type === 'rapprocheur' ||
            type === 'validation' ||
            type === 'verification' ||
            type === 'validateurRapport' ||
            type === 'verificateur' ||
            type === 'validateur' ||
            type === 'validateurCoursDesComptes') && {
            name: 'statutDeclaration',
            label: intl.formatMessage({ id: 'status' }),
            sm: 6,
            md: 4,
            list: listStatus,
            isSelect: true,
            required: false,
        },
        type === 'publierDeclarant' && {
            name: 'status',
            label: intl.formatMessage({ id: 'status' }),
            sm: 6,
            md: 4,
            list: listStatus,
            isSelect: true,
            required: false,
        },
        type === 'validateurCoursDesComptes' && {
            name: 'externecdc',
            label: 'إدارة المحاسبات',
            sm: 6,
            md: 4,
            list: listStatusCoursDesComptes,
            isSelect: true,
            required: false,
        },
        type === 'publierDeclarant' && /*
         * pour input etablissement
         */ {
            name: 'etablissement',
            label: intl.formatMessage({ id: 'listEtablissement' }),
            sm: 6,
            md: 4,
            list: listEtablissement,
            isSelect: true,
            required: false,
        },
        type === 'declarantInterne' && {
            name: 'declarant',
            label: intl.formatMessage({ id: 'situation' }),
            sm: 6,
            md: 4,
            list: listStatusDeclarant,
            isSelect: true,
            required: false,
        },
        type === 'inscription' && /*
         * pour input etablissement
         */ {
            name: 'etablissement',
            label: intl.formatMessage({ id: 'structureOpérateur' }),
            sm: 12,
            md: 12,
            list: listEtablissement,
            isAutoComplete: true,
            required: false,
        },
        type === 'inscription' && {
            name: 'statutDemande',
            label: intl.formatMessage({ id: 'situation' }),
            sm: 6,
            md: 4,
            list: listStatusInscription,
            isSelect: true,
            required: false,
        },
    ]
}

export default ListInput
