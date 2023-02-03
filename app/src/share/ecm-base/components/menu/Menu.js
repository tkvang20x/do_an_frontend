import React, { useState } from 'react'
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import './Menu.scss'

const SubMenu = (props) => {
    const [isExpand, setIsExpand] = useState(false)

    return (
        <div className='sub-menu'>
            <div className={`sub-menu__header ${isExpand ? "active": "inactive"}`} onClick={() => setIsExpand(!isExpand)}>
                <div className='sub-menu__header__content'>
                    {props.icon && props.icon !== "" ? <div className='sub-menu__header__icon'>{props.icon}</div>: ""}
                    <div className='sub-menu__header__title'>{props.title}</div> 
                </div>
                <div className='sub-menu__header__expand'>
                    <FontAwesomeIcon icon={faAngleRight} />
                </div>
                <div className='sub-menu__list-item__overlay'>
                    <div className='sub-menu__list-item__hover'>
                        {props.children}
                    </div>
                </div>
            </div>
            <div className={`sub-menu__list-item ${isExpand ? "expand": "inexpand"}`}>
                {props.children}
            </div>
        </div>
    )
}

const Item = (props) => {

    const {title, activeMenu, path} = props

    return (
        <div id={title}
        className={`menu-item menu_link_control ${activeMenu === path ? "menu-item__active": ""}`}>
            {props.icon && props.icon !== "" ? <div className='menu-item__icon'>{props.icon}</div>: ""}
            <div className='menu-item__title'>{props.children}</div> 
        </div>
    )
}

const MenuItem = ({ menuData }) => {
    //menu active when clicked
    const [activeMenu, setIsActiveMenu] = useState("")
    return (
        <>
            {menuData.map((item, index) => {
                return (
                    <GroupMenu
                        key={index}
                        menuData={item}
                        activeMenu={activeMenu}
                        setIsActiveMenu={setIsActiveMenu}
                    />
                )
            })}
        </>
    )
}

const GroupMenu = ({menuData, setIsActiveMenu, activeMenu}) => {
    return (<>
        { menuData.children ?
            <SubMenu name={menuData.name} title={menuData.title} icon={ menuData.icon && menuData.icon!== "" ?<FontAwesomeIcon icon={menuData.icon} /> : null} >
                {
                menuData.children && menuData.children.map((child, indexChild) => {
                    return(
                    <GroupMenu activeMenu={activeMenu}
                    setIsActiveMenu={setIsActiveMenu} menuData={child} key={indexChild} />
                    )
                })
                }
            </SubMenu> :
            <Item
                activeMenu={activeMenu}
                path={menuData.path}
                title={menuData.title}
                icon={ menuData.icon && menuData.icon!== "" ?<FontAwesomeIcon icon={menuData.icon} /> : null}
                >
                {
                menuData.path ?
                    <Link onClick={() => setIsActiveMenu(menuData.path)} to={menuData.path}>{menuData.title}</Link>
                    :
                    <div>{menuData.title}</div>
                }
            </Item>
        }</>
        )
}

export {SubMenu, Item, MenuItem}
