import { addLocaleData } from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import arLocaleData from 'react-intl/locale-data/ar'
import frLocaleData from 'react-intl/locale-data/fr'

import arTranslationMessages from '../translations/ar.json'
import frTranslationMessages from '../translations/fr.json'

const DEFAULT_LOCALE = 'en'

addLocaleData(enLocaleData)
addLocaleData(arLocaleData)
addLocaleData(frLocaleData)

export const appLocales = ['fr', 'ar']

/**
 * inialisation du langue
 *
 * @param {*} locale
 * @param {*} messages
 * @returns
 */
const formatTranslationMessages = (locale, messages) => {
    const defaultFormattedMessages =
        locale !== DEFAULT_LOCALE
            ? formatTranslationMessages(DEFAULT_LOCALE, frTranslationMessages)
            : {}
    return Object.keys(messages).reduce((formattedMessages, key) => {
        const formattedMessage =
            !messages[key] && locale !== DEFAULT_LOCALE
                ? defaultFormattedMessages[key]
                : messages[key]
        return Object.assign(formattedMessages, { [key]: formattedMessage })
    }, {})
}

export default {
    ar: formatTranslationMessages('ar', arTranslationMessages),
    fr: formatTranslationMessages('ar', frTranslationMessages),
}
