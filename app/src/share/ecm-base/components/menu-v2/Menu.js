import React, { useState } from 'react'
import './Menu.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons"
import PropTypes from 'prop-types'
import uuid from 'react-uuid';

const SubMenu = (props) => {
    const [isShowSubMenu, setIsShowSubMenu] = useState(false)
    const [idMenu] = useState(uuid())

    const {onClick = Function(), options, title, icon , isActiveHeader, index, item, type} = props

    const handleOnClick = () => {
        onClick(item, index, idMenu, type)
    }

    return (
        <div className='sub-menu-v2'>
            <div className={`sub-menu-v2__header ${isActiveHeader === idMenu ? "sub-menu-v2-active" : ""}`}>
                <div className='sub-menu-v2__header__content' onClick={handleOnClick}>
                    {props.icon && props.icon !== "" ? <div className='sub-menu-v2__header__icon'>{icon}</div>: ""}
                    <div className='sub-menu-v2__header__title'>{title}</div>
                </div>
                {options && <div
                    className='sub-menu-v2__header__option'
                    onClick={() => {setIsShowSubMenu(!isShowSubMenu)}}
                >
                    <div className='menu-v2-container__option'>
                        <div className='menu-v2-container__option__icon'>
                            <FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon>
                        </div>
                    </div>
                    {isShowSubMenu && <div
                        className={`sub-menu-v2__header__option__submenu__overlay`}
                        onClick={() => setIsShowSubMenu(!isShowSubMenu)}
                    ></div>}
                    {isShowSubMenu && <div className='sub-menu-v2__header__option__submenu'>
                        {options.map((option, index) => 
                        (<div className='sub-menu-v2__header__option__submenu__item'
                            onClick={option.action}
                            key={index}
                        >
                            {option.content}
                        </div>))}
                    </div>}
                </div>}
                <div className='sub-menu-v2__list-item__overlay'>
                    <div className='sub-menu-v2__list-item__hover'>
                        {props.children}
                    </div>
                </div>
            </div>
            <div className={`sub-menu-v2__list-item`}>
                {props.children}
            </div>
        </div>
    )
}

SubMenu.propTypes = {
    onClick: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.any,
    icon: PropTypes.any,
    isActiveHeader: PropTypes.bool,
    idMenu : PropTypes.any,
    item: PropTypes.any,
    index : PropTypes.any,
    type: PropTypes.any
}

const Item = (props) => {

    const [isShowSubMenu, setIsShowSubMenu] = useState(false)
    const {isActive, id, onClick= Function(), options , item, index_mother_folder, index_children_folder, type} = props

    const [idItem] = useState(uuid())

    const handleClick = () => {
        onClick(item, index_mother_folder, index_children_folder, type, idItem)
    }
    return (
        <div id={id}
            className={`menu-item-v2 ${isActive===idItem ? "menu-item-v2__active": ""}`}
        >
            <div 
                className="menu-item-v2__content"
                onClick={handleClick}
            >
                {props.icon && props.icon !== "" ? <div className='menu-item-v2__icon'>{props.icon}</div>: ""}
                <div className='menu-item-v2__title'>{props.children}</div>
            </div>
            {options && <div
                    className='sub-menu-v2__header__option'
                    onClick={() => {setIsShowSubMenu(!isShowSubMenu)}}
                >
                    <div className='menu-v2-container__option'>
                        <div className='menu-v2-container__option__icon'>
                            <FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon>
                        </div>
                    </div>
                    {isShowSubMenu && <div
                        className={`sub-menu-v2__header__option__submenu__overlay`}
                        onClick={() => setIsShowSubMenu(!isShowSubMenu)}
                    ></div>}
                    {isShowSubMenu && <div className='sub-menu-v2__header__option__submenu'>
                        {options.map((option, index) => 
                        (<div className='sub-menu-v2__header__option__submenu__item'
                            onClick={option.action}
                            key={index}
                        >
                            {option.content}
                        </div>))}
                    </div>}
                </div>}         
        </div>
    )
}

Item.propTypes = {
    isActive: PropTypes.bool,
    id: PropTypes.string,
    onClick: PropTypes.func,
    icon: PropTypes.any,
    options: PropTypes.arrayOf(PropTypes.object),
    item: PropTypes.any,
    index_mother_folder: PropTypes.any,
    index_children_folder: PropTypes.any,
    type: PropTypes.any
}

const Menu = (props) => {
    const {name, className, id} = props

    return (
        <>
        <div name={name} id={id} className={`sub-menu-v2__container ${className || ""}`}>
            {props.children}
        </div>
        </>
    )
}
Menu.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string
}

Menu.Item = Item
Menu.SubMenu = SubMenu

export default Menu;
