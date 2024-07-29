// firebase.js
import { initializeApp } from '@firebase/app'
import { getMessaging, getToken, onMessage } from '@firebase/messaging'
import { getAnalytics } from '@firebase/analytics'
import { toastNotification } from './notificationHelpers' // Import toastNotification function

const firebaseConfig = {
    apiKey: 'AIzaSyDhZ9m_negODkLe3h3rEx8SJsn9T-aaosI',

    authDomain: 'onspfe-f2d4f.firebaseapp.com',

    projectId: 'onspfe-f2d4f',

    storageBucket: 'onspfe-f2d4f.appspot.com',

    messagingSenderId: '961002533611',

    appId: '1:961002533611:web:19c5f2cf05e12ee45a44ae',

    measurementId: 'G-NV0WHWRNVS',
}

const firebaseApp = initializeApp(firebaseConfig)
const analytics = getAnalytics(firebaseApp)
const messaging = getMessaging(firebaseApp)
const setupNotifications = async () => {
    try {
        // Request permission for notifications
        const permission = await Notification.requestPermission()

        if (permission === 'granted') {
            console.log('Notification permission granted.')
            console.log(analytics)
            // Get the FCM token
            const token = await getToken(messaging)
            console.log('FCM Token:', token)
            localStorage.setItem('fcmtoken', token)
        } else {
            console.log('Notification permission denied.')
        }

        // Handle foreground notifications
        onMessage(messaging, payload => {
            console.log('Foreground Message:', payload)
            // Display toast notification
            toastNotification({
                title: payload.notification.title,
                description: payload.notification.body,
                status: 'info',
            })
        })
    } catch (error) {
        console.error('Error setting up notifications:', error)
    }
}
export { messaging, setupNotifications }
