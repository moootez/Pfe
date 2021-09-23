import React, {useState} from 'react'
import SubMenu from './SubMenu'
import SidebarData from './SidebarData'

const Sidebar = () => {

    const[showLinks, setShowLinks]= useState(false)
    const handleShowLinks = () => {
        setShowLinks(!showLinks)
    }
    
    const role = localStorage.getItem('role')
    
    return (
        
        <nav className={`navbar ${showLinks ? "show-nav" : "hide-nav"}`}>
            <ul className="navbar__links">
                {SidebarData.map((item) => { 
                    return item.roles.includes(role) && <li className="navbar__items"><SubMenu item={item} key={item.id} /></li>
                })}
            </ul>
            <button type='button' className="navbar_burger" onClick={handleShowLinks}>
                <span className="burger_bar"></span>
            </button>
        </nav>
    )
}

export default Sidebar
