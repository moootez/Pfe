import axios from 'axios'
import baseUrl from './baseUrl'

/* memeber */
const { OpaliaToken } = window.localStorage

let authorisation = ''
if (OpaliaToken) {
    authorisation = { Authorization: `Bearer ${OpaliaToken}` }
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
    security : {
        http : {
            headers: {
                "access-control-allow-origin": "*"
  },
    cors: {
        "access-control-allow-origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
        "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization, X-Request-With, soapaction, x-requested-with",
        "Access-Control-Allow-Credentials": "true"

     } }},
    timeout: 10000,
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


