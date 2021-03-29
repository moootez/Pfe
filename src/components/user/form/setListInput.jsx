import Data from '../../../data/dataDeclaration.json'

/**
 *
 *
 * @param {*} intl
 * @param {*} listDelegResidence
 * @param {*} listGov
 * @param {*} listCodePostalResidence
 * @param {*} allRoles
 * @returns
 */
const setListInput = (
    intl,
    listDelegResidence,
    listGov,
    listCodePostalResidence,
    allRoles
) => {
    return [
        {
            name: 'prenomTripartiteAr',
            sm: 6,
            md: 4,
            label: intl.formatMessage({ id: 'labelPrenomTri' }),
            placeholder: intl.formatMessage({ id: 'labelPrenomTri' }),
        },
        {
            name: 'nomAr',
            sm: 6,
            md: 4,
            label: intl.formatMessage({ id: 'labelNom' }),
            placeholder: intl.formatMessage({ id: 'labelNom' }),
        },
        {
            name: 'username',
            sm: 6,
            md: 4,
            isFormatted: true,
            label: "Nom d'utilisateur",
            placeholder: "Nom d'utilisateur",
        },
        {
            name: 'sexe',
            label: intl.formatMessage({ id: 'labelSexe' }),
            list: Data.listSexe,
            isSelect: true,
            selectAll: false,
            sm: 6,
            md: 4,
        },
        /*
         * pour input gouvernoratResidence
         */
        {
            name: 'gouvernoratResidence',
            label: intl.formatMessage({ id: 'labelGouvernorat' }),
            list: listGov,
            isSelect: true,
            isObject: true,
            selectAll: false,
            sm: 6,
            md: 4,
            required: false,
        },
        /*
         * pour input delegationResidence
         */
        {
            name: 'delegationResidence',
            label: intl.formatMessage({ id: 'labelDelegation' }),
            list: listDelegResidence,
            isSelect: true,
            isObject: true,
            selectAll: false,
            sm: 6,
            md: 4,
            required: false,
        },
        /*
         * pour input codePostaleResidence
         */
        {
            name: 'codePostaleResidence',
            required: false,
            label: intl.formatMessage({ id: 'labelCodePostal' }),
            list: listCodePostalResidence,
            isSelect: true,
            isObject: true,
            selectAll: true,
            sm: 6,
            md: 4,
        },
        /*
         * pour input adresseResidence
         */
        {
            name: 'adresseResidence',
            label: intl.formatMessage({ id: 'labelAddressResidence' }),
            placeholder: intl.formatMessage({ id: 'labelAddressResidence' }),
            sm: 6,
            md: 4,
            required: false,
        },
        /*
         * pour input tel
         */
        {
            name: 'tel',
            label: intl.formatMessage({ id: 'labelTelephone' }),
            placeholder: intl.formatMessage({ id: 'labelTelephone' }),
            isTel: true,
            sm: 6,
            md: 4,
        },
        /*
         * pour input email
         */
        {
            name: 'email',
            sm: 6,
            md: 4,
            required: true,
            label: intl.formatMessage({ id: 'labelAdressemail' }),
            placeholder: intl.formatMessage({ id: 'labelAdressemail' }),
            type: 'email',
        },
        {
            name: 'password',
            sm: 6,
            md: 4,
            type: 'password',
            label: intl.formatMessage({ id: 'labelPassword' }),
            placeholder: intl.formatMessage({ id: 'labelPassword' }),
        },
        {
            name: 'confirmerPassword',
            sm: 6,
            md: 4,
            type: 'password',
            label: intl.formatMessage({ id: 'labelConfirmPassword' }),
            placeholder: intl.formatMessage({ id: 'labelConfirmPassword' }),
        },
        {
            name: 'serialNumberToken',
            sm: 6,
            md: 4,
            label: intl.formatMessage({ id: 'serialNumber' }),
            placeholder: intl.formatMessage({ id: 'serialNumber' }),
            isFormatted: true,
        },
        {
            name: 'userRoles',
            required: true,
            label: intl.formatMessage({ id: 'role' }),
            list: allRoles,
            isSelect: true,
            // isObject: true,
            selectAll: true,
            sm: 6,
            md: 4,
        },
        {
            name: 'enable',
            label: intl.formatMessage({ id: 'enable' }),
            isCheck: true,
            sm: 6,
            md: 4,
        },
    ]
}

export default setListInput
