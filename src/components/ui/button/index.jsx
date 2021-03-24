/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

/**
 *
 *
 * @param {*} props
 * @returns
 */
const index = props => {
    const {
        label,
        type,
        color,
        clicked,
        size,
        disabled,
        bgColor,
        hoverColor,
        margin,
    } = props
    /**
     * style bouton
     */
    const useStyles = makeStyles(() => ({
        button: {
            margin,
            color,
            backgroundColor: bgColor,
            fontFamily:
                '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
            fontWeight: 600,
            borderRadius: 0,
            width: 200,
            '&:hover': {
                backgroundColor: hoverColor,
            },
        },
    }))
    const classes = useStyles()
    return (
        <Button
            variant={type}
            disabled={disabled}
            color={color}
            className={classes.button}
            size={size}
            onClick={() => clicked()}
        >
            {label}
        </Button>
    )
}
/**
 *  Inialisation
 */
index.defaultProps = {
    type: 'text',
    label: '',
    disabled: false,
    color: 'white',
    size: 'medium',
    bgColor: '#cd121a',
    hoverColor: 'rgb(184, 22, 25)',
    margin: '5px 5% 1%',
}
/**
 *  declaration des props
 */
index.propTypes = {
    margin: PropTypes.string,
    type: PropTypes.string,
    color: PropTypes.string,
    bgColor: PropTypes.string,
    hoverColor: PropTypes.string,
    disabled: PropTypes.bool,
    size: PropTypes.string,
    label: PropTypes.string,
    clicked: PropTypes.func.isRequired,
}
export default index
