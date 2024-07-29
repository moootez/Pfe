import React from 'react'
import { toast } from 'react-toastify' // Import the toast function from the toast library
import { FaBell } from 'react-icons/fa' // Example: Import an icon from react-icons library

export const toastNotification = ({ title, description, status }) => {
    // Display toast notification using React Toastify
    toast(
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <FaBell style={{ marginRight: '8px' }} />{' '}
                {/* Example icon usage */}
                <strong>{title}</strong>
            </div>
            <div>{description}</div>
        </div>,
        {
            type: status,
            className: 'Toastify__toast--animate', // Apply the animation class
            bodyClassName: 'custom-toast-body', // Apply custom body class
            progressClassName: 'custom-toast-progress', // Apply custom progress bar class
        }
    )
}

export const sendNativeNotification = ({ title, body }) => {
    // Implement your native notification logic
    console.log(`Native Notification: ${title} - ${body}`)
}
