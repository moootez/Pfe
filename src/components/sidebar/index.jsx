/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
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
import { withRouter, Link } from 'react-router-dom'
import SiteNav, { ContentGroup } from 'react-site-nav'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import data from './data.json'
import Slider from '../../assets/images/slider.png'

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
        <div className="hight-index">
            <img src={Slider} alt="Logo-INLUCC" style={{ width: '100%' }} />
        </div>
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
