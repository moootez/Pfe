/**
 *
 *
 * @param {*} intl
 * @returns
 */
const setListInput = intl => {
    return [
        {
            name: 'prenom',
            sm: 6,
            md: 4,
            label: intl.formatMessage({ id: 'labelPrenom' }),
            placeholder: intl.formatMessage({ id: 'labelPrenom' }),
        },
        {
            name: 'nom',
            sm: 6,
            md: 4,
            label: intl.formatMessage({ id: 'labelNom' }),
            placeholder: intl.formatMessage({ id: 'labelNom' }),
        },
        {
            name: 'fonction',
            label: intl.formatMessage({ id: 'Fonction' }),
            sm: 6,
            md: 4,
            placeholder: 'Fonction',
            required: false,
        },
        {
            name: 'direction',
            label: intl.formatMessage({ id: 'Direction' }),
            sm: 6,
            md: 4,
            placeholder: 'Direction',
            required: false,
        },
        /*
         * pour input tel
         */
        {
            name: 'tel',
            label: intl.formatMessage({ id: 'labelTelephone' }),
            placeholder: intl.formatMessage({ id: 'labelTelephone' }),
            // isTel: true,
            isFormatted: true,
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
        /* {
            name: 'serialNumberToken',
            sm: 6,
            md: 4,
            label: intl.formatMessage({ id: 'serialNumber' }),
            placeholder: intl.formatMessage({ id: 'serialNumber' }),
            isFormatted: true,
        }, */
        {
            name: 'userRoles',
            required: true,
            label: intl.formatMessage({ id: 'role' }),

            list: [
                {
                    label: 'ROLE_ADMIN',
                    value: 1,
                },
                {
                    label: 'ROLE_ADV',
                    value: 3,
                },
                {
                    label: 'ROLE_MANAGER',
                    value: 4,
                },
            ],
            isSelect: true,
            // isObject: true,
            selectAll: true,
            sm: 6,
            md: 4,
            disabled: true,
            ecran: true,
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
