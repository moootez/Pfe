/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'

/**
 *
 *
 * @param {*} { label }
 * @returns
 */
const index = ({ label }) => {
    return (
        <center>
            <div style={{ textDecoration: 'underline' }}>
                <Typography component="h3" variant="h5">
                    {label}
                </Typography>
            </div>
        </center>
    )
}
/**
 *  Inialisation
 */
index.defaultProps = {
    label: '',
}
/**
 *  declaration des props
 */
index.propTypes = {
    label: PropTypes.string,
}
export default index
