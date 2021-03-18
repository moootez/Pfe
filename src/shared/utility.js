/* eslint-disable global-require */
import { replace } from 'lodash'

/**
 *
 *
 * @export
 * @param {*} obj
 * @returns
 */
export function renameKeys(obj) {
    let keyValues = null
    keyValues = Object.keys(obj).map(key => {
        const newKey = obj[key] || key
        return { [newKey]: '' }
    })
    keyValues.splice(-1, 1)
    return Object.assign({}, ...keyValues)
}

/**
 * Get Date
 * @param value
 * @returns {Date}
 */
export const getDate = value => {
    const pattern = /(\w{2})\/(\w*)\/(\w{4})/
    const val = replace(value, pattern, '$3-$2-$1')
    return new Date(val)
}

/**
 * get age user
 *
 * @export
 * @param {*} dateString
 * @returns
 */
export function calcAge(dateString) {
    const birthday = +new Date(dateString)
    return (Date.now() - birthday) / 31557600000
}

/**
 *
 *
 * @export
 * @returns
 */
export default function generateKey() {
    const uuid = require('uuid/v1')
    const id = uuid()
    return id
}
/**
 * fomat date
 *
 * @export
 * @param {*} date
 * @returns
 */
export function formatDate(date) {
    const d = new Date(date)
    let month = `${d.getMonth() + 1}`
    let day = `${d.getDate()}`
    const year = d.getFullYear()
    if (month.length < 2) month = `0${month}`
    if (day.length < 2) day = `0${day}`
    return [year, month, day].join('-')
}

/**
 *
 *
 * @export
 * @param {*} str
 * @returns
 */
export function displayDate(str) {
    return str
        .split(' ')[0]
        .split('-')
        .reverse()
        .join('/')
}

export /**
 *
 *
 * @param {string} [language='fr']
 * @param {string} [attribute='intitule']
 * @returns
 */
const getTranslatedAttribute = (language = 'fr', attribute = 'intitule') => {
    return `${attribute}${language[0].toUpperCase()}r`
}

export /**
 *
 *
 * @param {*} value
 */
const isEmpty = value => value === undefined || value === null || value === ''

export function isValidEmail(value) {
    if (
        !isEmpty(value) &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ) {
        return false
    }
    return true
}

export /**
 *
 *
 * @param {*} err
 * @returns
 */
const errorMessageToReturn = err => {
    let errorMessage = `Code :  ${err.response.data.code.toString()}`
    if (Array.isArray(err.response.data.message)) {
        errorMessage = `${errorMessage} ${err.response.data.message
            .toString()
            .join()}`
    } else if (typeof err.response.data.message === 'object') {
        let errorMessageObject = ''
        Object.keys(err.response.data.message).forEach(key => {
            errorMessageObject = `${errorMessageObject}  ${key}  ${err.response.data.message[key]}`
        })
        errorMessage = `${errorMessage}  ${errorMessageObject}`
    } else {
        errorMessage = `${errorMessage}  ${err.response.data.message.toString()}`
    }

    return errorMessage
}
/**
 *
 *
 * @export
 * @param {*} message
 * @returns
 */
export function concatMessages(message) {
    try {
        if (typeof message.message === 'object') {
            if (message.data.intitulear) return message.data.intitulear.ar
            return message.data.intitulefr.ar
        }

        return message.message
    } catch (error) {
        return message
    }
}
/**
 *
 *
 * @export
 * @param {*} message
 * @returns
 */
export function concatObjectKeysMessages(message) {
    return message
}

export /**
 *
 *
 * @param {*} s
 * @returns
 */
const capitalize = s => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export const removeBottomDash = str => str.replaceAll('_', ' ')
