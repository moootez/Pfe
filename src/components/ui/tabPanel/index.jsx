import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@material-ui/core'

/**
 *
 *
 * @param {*} props
 * @returns
 */
const Index = props => {
    const { children, value, index, ...other } = props
    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box p={0}>{children}</Box>
        </Typography>
    )
}
/**
 *  declaration des props
 */
Index.propTypes = {
    children: PropTypes.node.isRequired,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}

export default Index
