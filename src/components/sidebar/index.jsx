/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/order */
/* eslint-disable react/prop-types */
/* eslint-disable no-debugger */
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
import Slider2 from '../../assets/images/slider-2.jpg'
// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const page = window.location.pathname
// const location = window.location.protocol + Slider
const location = window.location.protocol + Slider2
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
        <div className="hight-index">
            <div className="container">
                <SiteNav
                    className="container"
                    background="white"
                    fontSize="16"
                    style={{ borderRadius: '0px !important' }}
                >
                    {itemsMenu.map(item => {
                        const subBool = Boolean(item.subitems)
                        const rootUrl = subBool
                            ? { height: 'auto' }
                            : { rootUrl: item.link }
                        return (
                            <ContentGroup
                                {...rootUrl}
                                title={item.title}
                                style={{ borderRadius: '0px !important' }}
                            >
                                {/* 3. You can add anything in a ContentGroup */}
                                {subBool && (
                                    <ul
                                        className="list-group"
                                        style={{ borderRadius: '0px !important' }}
                                    >
                                        {item.subitems.map(subitem => (
                                            <li className="list-group-item">
                                                <Link
                                                    style={{ color: '#cd121a' }}
                                                    to={subitem.link}
                                                >
                                                    {subitem.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </ContentGroup>
                        )
                    })}
                </SiteNav>
            </div>
            {page === "/dashboard" &&
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                >
                    <SwiperSlide> <img src={location} alt="slider 1" />  </SwiperSlide>
                    <SwiperSlide> <img src="https://www.opaliarecordati.com/images/timelines/5/opalia-pharma-0.782662001616490312.jpg" alt="slider 2" /> </SwiperSlide>
                    <SwiperSlide> <img src="https://www.opaliarecordati.com/images/timelines/8/opalia-pharma-0.227952001616490470.jpg" alt="slider 3" /> </SwiperSlide>
                </Swiper>
            }

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
