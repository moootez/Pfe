import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import PropTypes from 'prop-types'

// function rand() {
//     return Math.round(Math.random() * 20) - 10
// }

/**
 * style modal position
 *
 * @returns
 */
function getModalStyle() {
    const top = 50
    const left = 50
    // return {
    //     top: `${top}%`,
    //     left: `${left}%`,
    //     transform: `translate(-${top}%, -${left}%)`,
    // }
    return {
        top: '50%',
        left: '50%',
        margin: 'auto',
        transform: `translate(-${top}%, -${left}%)`,
        textAlign: 'right',
    }
}
/**
 *  style modal
 */
const useStyles = makeStyles(theme =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 1000,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(1, 2, 1),
        },
    })
)

/**
 *
 *
 * @export
 * @param {*} { body, handleClose, open }
 * @returns
 */
export default function index({ body, handleClose, open }) {
    /**
     * hooks numbers
     */
    const classes = useStyles()
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle)

    const bodyContainer = (
        <div style={modalStyle} className={classes.paper}>
            {body}
        </div>
    )

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {bodyContainer}
            </Modal>
        </div>
    )
}
/**
 *  Inialisation
 */
index.defaultProps = {
    handleClose: () => {},
    open: false,
}
/**
 *  declaration des props
 */
index.propTypes = {
    body: PropTypes.element.isRequired,
    handleClose: PropTypes.func,
    open: PropTypes.bool,
}
