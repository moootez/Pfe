import React, {useState} from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'


const SidebarLabel = styled.span`
    padding: 10px;
    list-style: none;
    font-size: 18px;
    text-decoration: none;
    `;


const SubMenu = ({item}) => {
    const [subnav, setSubnav] = useState(false)
    const showSubnav = () => setSubnav(!subnav)

    console.log(subnav)

    return(
        <>
            <a href={item.link} id={item.id} onClick={showSubnav}>
                <SidebarLabel>{item.title}</SidebarLabel>
                <span>
                    {item.subNav && subnav
                    ? item.iconOpened
                    : item.subNav
                    ? item.iconClosed
                    : null}

                </span> 
            </a>
            {subnav && (
                <div className="sub_menu_blc">
                {item.subNav.map((item2) => {
                   return(
                       <a href={item2.link} key={item2.id}>
                           <SidebarLabel>{item2.title}</SidebarLabel>
                       </a>
                   )
               })}
               </div>
            )}
            
            
        </>
    )
}

SubMenu.propTypes = {
    item: PropTypes.node.isRequired,
};

export default SubMenu