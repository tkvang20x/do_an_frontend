import React, { useEffect, useState } from 'react'
import './DropDown.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types"

const DropDown = ({className, name, selected, listItem, onSelected, placeholder="", placement="bottom"}) => {

    const [valueSelected, setValueSelected]= useState(selected || null)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() =>{
        setValueSelected(selected)
    }, [selected])

    const handleSelect = (nameDrop, item) => {
        onSelected(nameDrop, item)
        setIsOpen(!isOpen)
        setValueSelected(item)
    }
    return (
        <div className={`${className ? className : ""} dropdown-container `}>
            <div
                className={`dropdown-container__overlay ${isOpen? "dropdown-container__overlay__active" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
            ></div>
            <div className='dropdown-container__header'
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className='dropdown-container__header__text'>{valueSelected ? valueSelected : placeholder}</div>
                <div
                    className='dropdown-container__header__icon'    
                >
                    <FontAwesomeIcon icon={ (placement === "top") ? faAngleUp : faAngleDown} />
                </div>
            </div>
            <div className={`dropdown-container__select-box ${isOpen ? "open" : ""} ${(placement === "top") ? "dropdown-container__select-box__top" : ""}`}>
                {
                    listItem?.map((item, index) => (
                        <div
                            key={index}
                            className='dropdown-container__select-box__item'
                            onClick={() => handleSelect(name, item)}
                        >{item}</div>
                    ))
                }
            </div>
        </div>
    )
}

DropDown.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    listItem: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    onSelected: PropTypes.func,
    placement: PropTypes.string
}

export default DropDown