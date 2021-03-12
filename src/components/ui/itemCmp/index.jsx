import React from 'react'
import PropTypes from 'prop-types'

/**
 *
 *
 * @param {*} { label }
 * @returns
 */
const index = ({ label }) => {
    return (
        <div style={{ fontSize: '28px', padding: '0.2em' }}>
            <b>
                {' '}
                * <u>{label}</u>
            </b>
        </div>
    )
}
/**
 *  declaration des props
 */
index.propTypes = {
    label: PropTypes.string.isRequired,
}

export default index
