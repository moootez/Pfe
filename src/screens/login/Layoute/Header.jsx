import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

/* style */
const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
}))

/**
 *
 *
 * @export
 * @returns
 */
export default function ButtonAppBar() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ background: '#f4f4f4' }}>
                <Toolbar></Toolbar>
            </AppBar>
        </div>
    )
}
