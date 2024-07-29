export const register = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/firebase-messaging-sw.js') // Correct path to the service worker script
            .then(registration => {
                console.log(
                    'Service Worker registered with scope:',
                    registration.scope
                )
            })
            .catch(error => {
                console.error('Error registering service worker:', error)
            })
    }
}
