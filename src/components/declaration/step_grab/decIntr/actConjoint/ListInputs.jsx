/**
 *
 *
 * @param {*} intl
 * @returns
 */
const ListInput = intl => {
    return [
        /*
         * pour input societe
         */
        {
            name: 'societe',
            sm: 6,
            md: 4,
            label: intl.formatMessage({ id: 'societe' }),
            placeholder: intl.formatMessage({ id: 'societe' }),
        },
        /*
         * pour input secteurActivite
         */
        {
            name: 'secteurActivite',
            sm: 6,
            md: 4,
            label: intl.formatMessage({ id: 'secteurActivite' }),
            placeholder: intl.formatMessage({ id: 'secteurActivite' }),
        },
        /*
         * pour input poste
         */
        {
            name: 'poste',
            sm: 6,
            md: 4,
            label: intl.formatMessage({ id: 'poste' }),
            placeholder: intl.formatMessage({ id: 'poste' }),
        },
        /*
         * pour input datePriseFonction
         */
        {
            name: 'datePriseFonction',
            label: intl.formatMessage({ id: 'datePriseFonction' }),
            sm: 6,
            md: 4,
            attributes: { disableFuture: true },
            isDate: true,
        },
        /*
         * pour input dateFinFonction
         */
        {
            name: 'dateFinFonction',
            label: intl.formatMessage({ id: 'dateFinFonction' }),
            sm: 6,
            md: 4,
            isDate: true,
            attributes: { disableFuture: false },
        },
    ]
}

export default ListInput
