// eslint-disable-next-line import/no-mutable-exports
let baseUrl = window.location.hostname
// baseUrl preprod
if (
    window.location.hostname === '10.1.1.171' ||
    baseUrl.indexOf('10.1.1.171') > -1
) {
    baseUrl = 'http://10.1.1.170:8000/api/'
}
// pour les developpeurs backend se connecter sur mon local à supprimer après
else if (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '10.1.1.206'
) {
    // baseUrl dev 206
    baseUrl = 'http://10.1.1.204:8000/api/'
} else if (
    baseUrl.indexOf('10.1.1.171') !== 0 &&
    baseUrl.indexOf('41.226.165.26') > -1
) {
    // baseUrl externe
    baseUrl = 'http://41.226.165.26:8274/api/'
}
export default baseUrl
