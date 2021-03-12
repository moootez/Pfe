import axios from 'axios'

/**
 * inialisation headers sans BaseUrl
 */
const instance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 500000,
})

/**
 * methode GET pour la signature
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
 * methode POST pour la signature
 *
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

const { interceptors, defaults } = instance
export default {
    Get,
    Post,
    interceptors,
    defaults,
}
