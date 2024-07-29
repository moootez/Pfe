import React, { useState, useEffect } from 'react'
import {
    Sidebar,
    Menu,
    MenuItem,
    SubMenu,
    useProSidebar,
} from 'react-pro-sidebar'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
// import { AiOutlineHome } from 'react-icons/ai'
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined'
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined'
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
// import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import { withRouter, Link } from 'react-router-dom'
import { setupNotifications } from '../../firebase/firebase'
import data from './data.json'
import LogoInetum from '../../assets/images/logoinetum.png'
import { history } from '../../store'
import Toast from '../../toast'

/**
 *
 *
 * @param {*} {  role , history}
 * @returns
 */
const index = ({ role, logout, loggedUser, children }) => {
    const { username } = loggedUser.User.details
    const [collapsed, setCollapsed] = useState(true)
    const [selectedItem, setSelectedItem] = useState(1)
    const [selectedSubItem, setSelectedSubItem] = useState(1)
    const [itemsMenu, setItemsMenu] = useState([])
    const { collapseSidebar } = useProSidebar()
    const getIcon = iconName => {
        switch (iconName) {
            case 'NewspaperOutlinedIcon':
                return <NewspaperOutlinedIcon />
            case 'Inventory2OutlinedIcon':
                return <Inventory2OutlinedIcon />
            case 'CollectionsOutlinedIcon':
                return <CollectionsOutlinedIcon />
            case 'TrendingUpOutlinedIcon':
                return <TrendingUpOutlinedIcon />
            case 'PeopleOutlinedIcon':
                return <PeopleOutlinedIcon />
            case 'LocalShippingOutlinedIcon':
                return <LocalShippingOutlinedIcon />
            case 'DescriptionOutlinedIcon':
                return <DescriptionOutlinedIcon />
            case 'FactCheckOutlinedIcon':
                return <FactCheckOutlinedIcon />
            case 'FeedbackOutlinedIcon':
                return <FeedbackOutlinedIcon />
            default:
                return <WarningAmberOutlinedIcon /> // Fallback icon
        }
    }

    const handleLogout = () => {
        logout()
        history.push('/')
        window.location.reload()
    }
    useEffect(() => {
        setupNotifications()
        if (role) {
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

            setItemsMenu(newRoutes.length > 0 ? newRoutes : [])
        } else {
            setItemsMenu(data[0].items)
        }
    }, [role])

    const handleToggleSidebar = () => {
        setCollapsed(!collapsed)
        collapseSidebar()
    }

    const handleSelectItem = (event, item) => {
        history.push({ pathname: item.link })
    }

    const handleClickSubItem = (e, item) => {
        setSelectedSubItem(item.id)
        console.log(selectedSubItem)
        handleSelectItem(e, item)
        handleToggleSidebar()
    }

    const handleClickItem = (e, item) => {
        setSelectedItem(item.id)
        console.log(selectedItem)
        handleToggleSidebar()
    }

    // Divider component
    const Divider = () => (
        <div
            style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                margin: '10px 0',
            }}
        />
    )

    return (
        <div style={{ height: '100vh', display: 'flex' }}>
            <Sidebar
                collapsed={collapsed}
                backgroundColor="#232d4b"
                style={{ height: '100vh' }}
            >
                <Menu
                    menuItemStyles={{
                        button: {
                            '&:hover': {
                                backgroundColor: '#00aa9b',
                            },
                        },
                    }}
                >
                    <div
                        className={
                            collapsed
                                ? 'logo-container-collapse'
                                : 'logo-container-expanded'
                        }
                        role="presentation"
                    >
                        <img
                            src={LogoInetum}
                            alt="Logo-Inetum"
                            className="logo-expanded"
                            style={{ marginTop: '24px' }}
                        />
                    </div>
                    <Divider />
                    <MenuItem
                        icon={
                            <MenuOutlinedIcon
                                style={{ color: 'rgb(210,210,210)' }}
                            />
                        }
                        onClick={handleToggleSidebar}
                        style={{
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '24px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <p
                                className="username"
                                style={{ margin: 0, color: 'rgb(210,210,210)' }}
                            >
                                Bienvenue {username}
                            </p>
                        </div>
                    </MenuItem>
                    <Divider />
                    {itemsMenu.map(item =>
                        item.subitems ? (
                            <SubMenu
                                key={item.id}
                                label={item.title}
                                icon={getIcon(item.icon)}
                                style={{ color: 'rgb(210,210,210)' }}
                            >
                                {item.subitems.map(subitem => (
                                    <MenuItem
                                        key={subitem.id}
                                        onClick={e =>
                                            handleClickSubItem(e, subitem)
                                        }
                                    >
                                        <Link to={subitem.link}>
                                            {subitem.title}
                                        </Link>
                                    </MenuItem>
                                ))}
                            </SubMenu>
                        ) : (
                            <MenuItem
                                key={item.id}
                                icon={getIcon(item.icon)}
                                style={{ color: 'rgb(210,210,210)' }}
                                onClick={e => handleClickItem(e, item)}
                            >
                                <Link
                                    to={item.link}
                                    style={{
                                        color: '#fff',
                                        textDecoration: 'none',
                                    }}
                                >
                                    {item.title}
                                </Link>
                            </MenuItem>
                        )
                    )}
                    <Divider />
                    <MenuItem
                        onClick={handleLogout}
                        icon={
                            <LogoutOutlinedIcon
                                style={{ color: 'rgb(210,210,210)' }}
                            />
                        }
                        style={{ marginTop: '24px', color: 'rgb(210,210,210)' }}
                    >
                        Déconnexion
                    </MenuItem>
                </Menu>
            </Sidebar>
            <main
                style={{
                    padding: '20px',
                    backgroundColor: '#f0f5f9',
                    flexGrow: 1,
                    overflowY: 'auto', // Add this to enable scrolling within the main content area
                    // marginLeft: collapsed ? '80px' : '240px', // Adjust based on the sidebar width
                    // transition: 'margin-left 0.3s',
                }}
            >
                {children}
            </main>
            <Toast />
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
    role: state.login.response.User.details.userRoles[0].role,
    loggedUser: state.login.response,
})
/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    logout: () =>
        dispatch({
            type: 'SIGNOUT_REQUEST',
        }),
})
index.propTypes = {
    children: PropTypes.node.isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    role: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
    loggedUser: PropTypes.shape({
        User: PropTypes.shape({
            details: PropTypes.shape({
                username: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
    }).isRequired,
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(index)
