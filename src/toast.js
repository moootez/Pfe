import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Toast.css' // Import custom CSS for additional styles

const Toast = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            className="Toastify__toast--animate" // Apply the animation class
            toastClassName="custom-toast-body" // Apply custom body class
            progressClassName="custom-toast-progress" // Apply custom progress bar class
        />
    )
}

export default Toast
