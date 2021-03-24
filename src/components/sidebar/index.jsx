/* eslint-disable react/forbid-prop-types */
import React, { Fragment, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
// import Immutable from 'seamless-immutable'
import { Typography, Collapse } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import data from './data.json'

/* style */
/**
 * style css
 */
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingRight: theme.spacing(1),
    },
    itemText: {
        fontSize: '20px',
    },
    subItemText: {
        fontSize: '17px',
    },
    listItem: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    subItemList: {
        background: 'rgb(230, 230, 230)',
    },
    selectedSubText: {
        fontSize: '17px',
        fontWeight: 'bold',
    },
}))

/**
 *
 *
 * @param {*} { history, interfaces }
 * @returns
 */
const index = ({ history, role }) => {
    const classes = useStyles()
    const [selectedItem, setSelectedItem] = useState(1)
    const [selectedSubItem, setSelectedSubItem] = useState(1)
    const [open, setOpen] = useState(false)
    const [itemsMenu, setItemsMenu] = useState([])
    /* functions */
    /**
     * select item in sidbar
     *
     * @param {*} event
     * @param {*} item
     */
    const handleSelectItem = (event, item) => {
        history.push({
            pathname: item.link,
        })
    }

    /* life cycle */
    useEffect(() => {
        try {
            if (role) {
                // const ecran = Immutable.asMutable([role])
                const newRoutes = data[0].items
                    .map(menu => {
                        if (menu.subitems) {
                            return {
                                ...menu,
                                subitems: menu.subitems.filter(submenu =>
                                    submenu.roles.includes(role)
                                ),
                            }
                        }
                        return menu
                    })
                    .filter(menu => menu.roles.includes(role))

                if (newRoutes.length > 0) {
                    setItemsMenu(newRoutes)
                } else {
                    setItemsMenu([])
                }
            } else setItemsMenu(data[0].items)
        } catch (e) {
            console.log(e)
        }
    }, [])
    /**
     * select sous menu
     *
     * @param {*} e
     * @param {*} item
     */
    const handleClickSubItem = (e, item) => {
        setSelectedSubItem(item.id)
        handleSelectItem(e, item)
        setOpen(false)
        // tabClicked(e, true)
    }

    /**
     * select menu
     *
     * @param {*} e
     * @param {*} item
     */
    const handleClickItem = (e, item) => {
        setSelectedItem(item.id)
        setOpen(!open)
    }

    /* render */

    return (
        <Fragment>
            <List>
                {itemsMenu.map(item => (
                    <Fragment>
                        {item.subitems !== null ? (
                            <Fragment>
                                <ListItem
                                    button
                                    onClick={e => handleClickItem(e, item)}
                                    className={classes.listItem}
                                >
                                    <ListItemText
                                        primary={
                                            <Typography
                                                className={classes.itemText}
                                            >
                                                {item.title}
                                            </Typography>
                                        }
                                    />
                                    {open && selectedItem === item.id ? (
                                        <ExpandLess />
                                    ) : (
                                        <ExpandMore />
                                    )}
                                </ListItem>
                                <Collapse
                                    in={open}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    {open &&
                                    item.subitems !== null &&
                                    selectedItem === item.id ? (
                                        <List component="div" disablePadding>
                                            {item.subitems.map(subitem => (
                                                <ListItem
                                                    button
                                                    onClick={e =>
                                                        handleClickSubItem(
                                                            e,
                                                            subitem
                                                        )
                                                    }
                                                    className={
                                                        selectedSubItem ===
                                                        subitem.id
                                                            ? classes.subItemList
                                                            : ''
                                                    }
                                                >
                                                    <ListItemText
                                                        primary={
                                                            <Typography
                                                                className={
                                                                    selectedSubItem ===
                                                                    subitem.id
                                                                        ? classes.selectedSubText
                                                                        : classes.subItemText
                                                                }
                                                            >
                                                                {subitem.title}
                                                            </Typography>
                                                        }
                                                        className={
                                                            classes.nested
                                                        }
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    ) : null}
                                </Collapse>
                            </Fragment>
                        ) : (
                            <ListItem
                                button
                                onClick={e => handleClickSubItem(e, item)}
                                className={classes.listItem}
                            >
                                <ListItemText
                                    primary={
                                        <Typography
                                            className={classes.itemText}
                                        >
                                            {item.title}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        )}
                    </Fragment>
                ))}
            </List>
        </Fragment>
    )
}

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = state => ({
    language: state.info.language,
    interfaces: state.login.response.User.ecrans,
    role: state.login.response.User.details.userRoles[0].role,
})
/**
 *  declaration des props
 */
index.propTypes = {
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    role: PropTypes.string.isRequired,
}
export default compose(
    withRouter,
    connect(
        mapStateToProps,
        null
    )
)(index)
