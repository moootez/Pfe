import React from 'react'
import ReactDOM from 'react-dom'
import { registerLicense } from '@syncfusion/ej2-base'
import './index.css'
import { ProSidebarProvider } from 'react-pro-sidebar'
import App from './App'
import * as serviceWorker from './serviceWorker'

/*
 * render APP
 */

registerLicense(
    'Ngo9BigBOggjHTQxAR8/V1NCaF1cWGhBYVF0WmFZfVpgfF9EYFZVR2YuP1ZhSXxXdkJhUH5bc3JWRGZYVEY='
)
ReactDOM.render(
    <ProSidebarProvider>
        <App />
    </ProSidebarProvider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
