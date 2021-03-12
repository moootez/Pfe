import React from 'react'
import PropTypes from 'prop-types'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import { withStyles } from '@material-ui/core/styles'
/**
 * style bouton plus
 * @param {*} theme
 */
const styles = theme => ({
    fab: {
        textAlign: 'center',
        margin: theme.spacing(1),
    },
})

/**
 *
 *
 * @param {*} { fn, classes, color, label, ariaLabel }
 * @returns
 */
const index = ({ fn, classes, color, label, ariaLabel }) => {
    return (
        <center>
            <Fab
                size="small"
                color={color}
                // disabled={disabled}
                aria-label={ariaLabel}
                className={classes.fab}
            >
                {ariaLabel === 'add' ? (
                    <AddIcon onClick={fn} />
                ) : (
                    <DeleteIcon onClick={fn} />
                )}
            </Fab>
            <label
                htmlFor="input"
                className="mt-3 mr-2 mb-0 ml-2 font-weight-bold text-uppercase text-primary"
            >
                {label}
            </label>
        </center>
    )
}
/**
 *  Inialisation
 */
index.defaultProps = {
    label: '',
    // disabled: false,
    ariaLabel: 'add',
}
/**
 *  declaration des props
 */
index.propTypes = {
    fn: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    // disabled: PropTypes.bool,
    label: PropTypes.string,
    ariaLabel: PropTypes.string,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(index)
