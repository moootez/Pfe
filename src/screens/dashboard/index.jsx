/* eslint-disable no-unused-vars */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { Redirect, Route, Switch } from 'react-router'
import PropTypes from 'prop-types'
import Sidebar from '../../components/sidebar'
import DashboardHeader from '../../components/dashboard/header'
import listOfRoutes from '../../routes/listOfRoutes'
import './style.css'


const drawerWidth = 260

// style
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100%',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        top: 96,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        margin: '0 auto',
        color: '# cd121a',
    },
    hide: {
        display: 'none',
    },
    drawer: {
        position: 'absolute',
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        position: 'relative',
        backgroundColor: '#f8f5f5',
        boxShadow: '0px 2px 0 #d4d2d2',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        position: 'absolute',
        height: 80,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '15px 22px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}))

/**
 *
 *
 * @export
 * @param {*} { isLogged }
 * @param {*} { userRole }
 * @returns
 */
export default function Index({ isLogged, userRole }) {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)

    /**
     * Handle Drawer Open
     *
     */
    function handleDrawerOpen() {
        setOpen(true)
    }

    /**
     * Handle Drawer Close
     *
     */
    function handleDrawerClose() {
        setOpen(false)
    }

    /**
     * Select Handler
     *
     * @param {*} e
     * @param {*} openMenu
     */
    function selectHandler(e, openMenu) {
        setOpen(openMenu)
        handleDrawerClose()
    }
    const logged = isLogged || true
    return (
        <div className={classes.root}>
            {/* {logged && (
                <Drawer
                    variant="permanent"
                    className={`${classes.drawer} ${
                        open ? classes.drawerOpen : classes.drawerClose
                    }`}
                    classes={{
                        paper: open ? classes.drawerOpen : classes.drawerClose,
                    }}
                    open={open}
                >
                    <div className={`${classes.toolbar} ${!open && 'mx-auto'}`}>
                        {!open ? (
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={`${classes.menuButton} ${
                                    open ? classes.hide : ''
                                }`}
                            >
                                <MenuIcon />
                            </IconButton>
                        ) : (
                            <IconButton onClick={handleDrawerClose}>
                                <ChevronRightIcon
                                    style={{ color: '# cd121a' }}
                                />
                            </IconButton>
                        )}
                    </div>
                    {open && (
                        <Sidebar
                            userRole={userRole}
                            drawerIsOpen={open}
                            tabClicked={(e, openMenu) =>
                                selectHandler(e, openMenu)
                            }
                        />
                    )}
                </Drawer>
            )} */}

            <main
                className="content dashboard-main"
                style={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    background: `background: url(https://www.opaliarecordati.com/img/opalia-icon/background_repeat.png) center center repeat rgba(255, 255, 255, 0.5)`,
                    backgroundColor: `rgba(255, 255, 255, 0.5)`,
                }}
            >
                {logged && <DashboardHeader />}
                <Sidebar
                    userRole={userRole}
                    drawerIsOpen={open}
                    tabClicked={(e, openMenu) => selectHandler(e, openMenu)}
                />


                <div style={{ zIndex: 0, backgroundColor: 'rgba(194, 13, 32, 0.9)', border: '5px solid rgba(194, 13, 32, 0.9)' }}>

                    {listOfRoutes.map(route => route)}


                </div>
            </main>
        </div>
    )
}
/**
 *  declaration des props
 */
Index.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    userRole: PropTypes.string.isRequired,
}
