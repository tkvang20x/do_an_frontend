import React, { useState } from 'react'
import './DropDown.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const DropDown = ({className, name, selected, listItem, onSelected, placement="bottom"}) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className={`${className ? className : ""} dropdown-container `}>
            <div
                className={`dropdown-container__overlay ${isOpen ? "dropdown-container__overlay__active" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
            ></div>
            <div className='dropdown-container__header'
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className='dropdown-container__header__text'>{listItem?.find(item => item.value === selected)?.title}</div>
                <div
                    className='dropdown-container__header__icon'    
                >
                    <FontAwesomeIcon icon={ (placement == "top") ? faAngleUp : faAngleDown} />
                </div>
            </div>
            <div className={`dropdown-container__select-box ${isOpen ? "open" : ""} ${(placement == "top") ? "dropdown-container__select-box__top" : ""}`}>
                {
                    listItem.map((item, index) => (
                        <div
                            key={index}
                            className='dropdown-container__select-box__item'
                            onClick={() => {
                                onSelected(name, item.value)
                                setIsOpen(!isOpen)
                            }}
                        >{item.title}</div>
                    ))
                }
            </div>
        </div>
    )
}

export default DropDown