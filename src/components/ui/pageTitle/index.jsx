/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import './pageTitle.css'

/**
 *
 *
 * @param {*} props
 * @returns
 */
const index = props => {
    const { style, label } = props
    return (
        <center>
            <div className="pageTitle">
                <Typography
                    component="h1"
                    variant="h5"
                    className="typo"
                    style={{ ...style }}
                >
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
    style: {},
    label: '',
}
/**
 *  declaration des props
 */
index.propTypes = {
    style: PropTypes.object,
    label: PropTypes.string,
}
export default index
