import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
// import Typography from '@material-ui/core/Typography'
// import { FormattedMessage } from 'react-intl'
// import flagTn from '../../../assets/images/flag-tn.svg'

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
                <Toolbar>
                    {/* <img
                        src={flagTn}
                        alt="tunisia-flag"
                        style={{ width: '60px' }}
                    />
                    <Typography
                        variant="h6"
                        style={{ color: 'black', marginRight: '6px' }}
                    >
                        <FormattedMessage id="nameRepublic" />
                    </Typography> */}
                </Toolbar>
            </AppBar>
        </div>
    )
}
