/**
 *
 *
 * @param {*} intl
 * @returns
 */
const setListInput = intl => {
    return [
        {
            name: 'oldPassword',
            sm: 6,
            md: 4,
            type: 'password',
            label: intl.formatMessage({ id: 'oldPassword' }),
            placeholder: intl.formatMessage({ id: 'oldPassword' }),
        },
        {
            name: 'confirmerOldPassword',
            sm: 6,
            md: 4,
            type: 'password',
            label: intl.formatMessage({ id: 'confirmerOldPassword' }),
            placeholder: intl.formatMessage({ id: 'confirmerOldPassword' }),
        },
        {
            name: 'newPassword',
            sm: 6,
            md: 4,
            type: 'password',
            label: intl.formatMessage({ id: 'newPassword' }),
            placeholder: intl.formatMessage({ id: 'newPassword' }),
        },
        {
            name: 'confirmerNewPassword',
            sm: 6,
            md: 4,
            type: 'password',
            label: intl.formatMessage({ id: 'confirmerNewPassword' }),
            placeholder: intl.formatMessage({ id: 'confirmerNewPassword' }),
        },
    ]
}

export default setListInput
