import axios from 'axios'
import baseUrl from './baseUrl'

/* memeber */
const { InluccToken } = window.localStorage

let authorisation = ''
if (InluccToken) {
    authorisation = { Authorization: `Bearer ${InluccToken}` }
} else {
    authorisation = ''
}
/**
 * Inialisation headers
 */

const instance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Accept-Version': 1,
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8',
        ...authorisation,
    },
    timeout: 500000,
})

/**
 *
 *
 * @export
 * @param {*} url
 * @returns
 */
export function Get(url) {
    return new Promise(resolve => {
        resolve(instance.get(url))
    })
}

/**
 *
 * methode POST
 * @export
 * @param {*} url
 * @param {*} payload
 * @returns
 */
export function Post(url, payload) {
    return new Promise(resolve => {
        resolve(instance.post(url, payload))
    })
}

/**
 *
 * methode PATCH
 * @export
 * @param {*} url
 * @param {*} payload
 * @returns
 */
export function Patch(url, payload) {
    return new Promise(resolve => {
        resolve(instance.patch(url, payload))
    })
}

/**
 * methode DELETE
 *
 * @export
 * @param {*} url
 * @param {*} payload
 * @returns
 */
export function Delete(url, payload) {
    return new Promise(resolve => {
        if (payload) {
            resolve(instance.delete(url, { data: payload }))
        } else {
            resolve(instance.delete(url))
        }
    })
}
/**
 * methode PUT
 *
 * @export
 * @param {*} url
 * @param {*} payload
 * @returns
 */
export function Put(url, payload) {
    return new Promise(resolve => {
        resolve(instance.put(url, payload))
    })
}
const { interceptors, defaults } = instance
export default {
    Put,
    Get,
    Post,
    Patch,
    Delete,
    interceptors,
    defaults,
}
