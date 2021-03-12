import React from 'react'
import PropTypes from 'prop-types'

/**
 * render cas if crash
 *
 * @class ErrorBoundary
 * @extends {React.Component}
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    /**
     *
     *
     * @static
     * @param {*} error
     * @returns
     * @memberof ErrorBoundary
     */
    static getDerivedStateFromError(error) {
        console.log('error', error)
        return { hasError: true }
    }

    /* render */
    /**
     *
     *
     * @returns
     * @memberof Actions
     */
    render() {
        const { hasError } = this.state
        const { children } = this.props
        if (hasError) {
            return (
                <div>
                    <center>
                        <h1>Un problème est survenu </h1>
                    </center>
                </div>
            )
        }

        return children
    }
}
/**
 *  declaration des props
 */
ErrorBoundary.propTypes = {
    children: PropTypes.object.isRequired,
}

export default ErrorBoundary
