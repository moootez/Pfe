/**
 *
 *
 * @param {*} intl
 * @param {*} isTunisian
 * @param {*} listGov
 * @param {*} listCodePostalResidence
 * @param {*} listNatio
 * @param {*} listDelegation
 * @returns
 */
const ListInput = (
    intl,
    isTunisian,
    listGov,
    listCodePostalResidence,
    listNatio,
    listDelegation
) => {
    return [
        /*
         * pour input prenomTripartite
         */
        {
            name: 'prenomTripartite',
            sm: 6,
            md: 4,
            label: intl.formatMessage({ id: 'labelPrenom' }),
            placeholder: intl.formatMessage({ id: 'labelPrenom' }),
        },
        /*
         * pour input nom
         */
        {
            name: 'nom',
            sm: 6,
            md: 4,
            label: intl.formatMessage({ id: 'labelNom' }),
            placeholder: intl.formatMessage({ id: 'labelNom' }),
        },
        /*
         * pour input dateNaissance
         */
        {
            name: 'dateNaissance',
            label: intl.formatMessage({ id: 'labelDatedenaissance' }),
            isDate: true,
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
            sm: 12,
            md: 8,
        },
        /*
         * pour input gouvernoratResidence
         */
        {
            name: 'gouvernoratResidence',
            label: intl.formatMessage({ id: 'labelGouvernorat' }),
            list: listGov,
            isSelect: true,
            sm: 6,
            md: 4,
        },
        /*
         * pour input delegationResidence
         */
        {
            name: 'delegationResidence',
            label: intl.formatMessage({ id: 'labelDelegation' }),
            list: listDelegation,
            isSelect: true,
            sm: 6,
            md: 4,
        },
        /*
         * pour input codePostaleResidence
         */
        {
            name: 'codePostaleResidence',
            label: intl.formatMessage({ id: 'labelCodePostal' }),
            list: listCodePostalResidence,
            isSelect: true,
            required: false,
            sm: 6,
            md: 4,
        },
        /*
         * pour input nationalite
         */
        {
            name: 'nationalite',
            label: intl.formatMessage({ id: 'labelNationalite' }),
            list: listNatio,
            isSelect: true,
            sm: 6,
            md: 4,
        },
        !isTunisian
            ? {
                  name: 'numPassport',
                  md: 4,
                  label: intl.formatMessage({ id: 'labelNumeroPasseport' }),
                  placeholder: intl.formatMessage({
                      id: 'labelNumeroPasseport',
                  }),
                  sm: 6,
                  type: 'text',
              }
            : {
                  name: 'numCin',
                  label: intl.formatMessage({ id: 'labelNumeroCIN' }),
                  placeholder: intl.formatMessage({ id: 'labelNumeroCIN' }),
                  type: 'number',
                  md: 4,
                  sm: 6,
              },
        /*
         * pour input fonction
         */
        {
            name: 'fonction',
            label: intl.formatMessage({ id: 'fonction' }),
            placeholder: intl.formatMessage({ id: 'fonction' }),
            sm: 6,
            md: 4,
        },
        /*
         * pour input tel
         */
        {
            name: 'tel',
            label: 'رقم الهاتف الشخصي',
            placeholder: 'رقم الهاتف الشخصي',
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
            required: false,
            label: ' البريد الإلكتروني',
            placeholder: ' البريد الإلكتروني',
            type: 'email',
        },
    ]
}

export default ListInput
