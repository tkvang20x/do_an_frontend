import React, { useState } from 'react'
import './DropDown.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types"

const DropDown = ({ className, name, selected, listItem, onSelected, placeholder, placement = "bottom", disable = false , indexTable}) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className={`${className ? className : ""} dropdown-container ${disable === true ? "dropdown-container__no-drop" : ""}`}>
            <div
                className={`dropdown-container__overlay ${isOpen ? "dropdown-container__overlay__active" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
            ></div>
            <div className={`dropdown-container__header`}
                onClick={() => {
                    if (disable === false ) {
                        setIsOpen(!isOpen)
                    } else {
                        setIsOpen(false)
                    }
                }
                }
            >
                <div className='dropdown-container__header__text'>
                    {(selected !== "undefine" && selected !== "") ? listItem?.find(item => item.value === selected)?.title : placeholder}
                </div>
                <div
                    className='dropdown-container__header__icon'
                >
                    <FontAwesomeIcon icon={(placement == "top") ? faAngleUp : faAngleDown} />
                </div>
            </div>
            <div className={`ecm-base__scroll dropdown-container__select-box ${isOpen ? "open" : ""} ${(placement == "top") ? "dropdown-container__select-box__top" : ""}`}>
                {
                    listItem.map((item, index) => (
                        <div
                            key={index}
                            className='dropdown-container__select-box__item'
                            onClick={() => {
                                onSelected(name, item.value, indexTable)
                                setIsOpen(!isOpen)
                            }}
                        >{item.title}</div>
                    ))
                }
            </div>
        </div>
    )
}

DropDown.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    selected: PropTypes.string,
    listItem: PropTypes.arrayOf(PropTypes.any),
    onSelected: PropTypes.func,
    placement: PropTypes.string
}

export default DropDown