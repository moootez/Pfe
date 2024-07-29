importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js')
importScripts(
    'https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js'
)

const firebaseConfig = {
    apiKey: 'AIzaSyCD5qQebYtaPYoui_CJIQYVs7p1BGWF980',
    authDomain: 'pim2024-63da1.firebaseapp.com',
    projectId: 'pim2024-63da1',
    storageBucket: 'pim2024-63da1.appspot.com',
    messagingSenderId: '27810660519',
    appId: '1:27810660519:web:449b61c9e0786d33fb5b82',
    measurementId: 'G-C4CWPCW4GM',
}
const firebaseApp = firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

// Customize background notification handling here
messaging.onBackgroundMessage(payload => {
    console.log('Background Message:', payload)
    const notificationTitle = payload.notification.title
    const notificationOptions = {
        body: payload.notification.body,
    }
    self.registration.showNotification(notificationTitle, notificationOptions)
})
