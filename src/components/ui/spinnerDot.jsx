import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

/**
 *
 *
 * @class spinnerDot
 * @extends {React.Component}
 */
class spinnerDot extends React.Component {
    constructor(props) {
        super(props)
        this.state = { xScroll: 0, yScroll: 0 }
        this.xScroll = 0
        this.yScroll = 0
    }

    /* life cycle */

    /**
     *
     *
     * @memberof
     */
    componentDidMount() {
        window.addEventListener('scroll', e => this.onScroll(e))
    }

    /**
     *
     *
     * @memberof spinnerDot
     */
    componentWillUnmount() {
        window.removeEventListener('scroll', () =>
            console.log('removeEventscroll')
        )
    }

    /**
     *
     *
     * @memberof spinnerDot
     */
    onScroll = () => {
        const doc = document.documentElement
        this.xScroll =
            (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)
        this.yScroll =
            (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
        this.setState({ xScroll: this.xScroll, yScroll: this.yScroll })
    }

    /* render */
    /**
     *
     *
     * @returns
     * @memberof Actions
     */
    render() {
        const { show } = this.props
        const { xScroll, yScroll } = this.state

        return (
            <div
                className="spinner"
                style={{
                    marginLeft: xScroll,
                    marginTop: yScroll,
                    display: show ? 'block' : 'none',
                }}
            >
                <div className="dot1" style={{ backgroundColor: '#cd121a' }} />
                <div className="dot2" style={{ backgroundColor: '#cd121a' }} />
            </div>
        )
    }
}
// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = state => ({
    connected: state.login.connected,
})
/**
 *  declaration des props
 */
spinnerDot.propTypes = {
    show: PropTypes.bool.isRequired,
}

export default connect(
    mapStateToProps,
    null
)(spinnerDot)
