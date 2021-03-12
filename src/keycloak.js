import Keycloak from 'keycloak-js'
// import instance from '../src/serveur/axios'
// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const test = {
    realm: 'experimental',
    url: 'http://10.1.1.63:8180/auth/',
    'ssl-required': 'external',
    clientId: 'myapp',
    'public-client': true,
    'confidential-port': 0,
    'enable-cors': true,
    'bearer-only': true,
}

const keycloakParent = Keycloak(test)
// keycloakParent.init({onLoad: 'login-required'}).success((auth) => {

//     if (!auth) {
//         console.info("NONAuthenticated");

//     } else {
//         alert('hhhhhhhhhhhhhhhhhhhhhhhhhhh')

//         console.info("Authenticated");
//         localStorage.setItem("reactoken", keycloakParent.token);
//         localStorage.setItem("react-refresh-token", keycloakParent.refreshToken);
//         const { reactoken } = window.localStorage
//         instance.defaults.headers.Authorization = `Bearer ${reactoken}`
//     }
// })
// console.log(keycloakParent.token,'tokennnnn')

export default keycloakParent
