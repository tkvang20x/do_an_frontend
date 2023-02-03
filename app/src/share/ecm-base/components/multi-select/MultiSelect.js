import React, { useState,useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faCheck } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types"
import "./MultiSelect.scss"
import Tag from "../tag/Tag"

const MultiSelect = ({ className, name, value, listItem, onChange, placeholder, placement = "bottom" }) => {

    const [listSelected, setListSelected] = useState(value || [])
    const [isOpen, setIsOpen] = useState(false)

    useEffect(()=>{
        setListSelected(value)
    },[value])

    const checkSelected = (valueData) => {
        return !!(listSelected?.find(item => item.value === valueData));
    }


    const handleListSelected = (item) => {
        const newListSelected = [...listSelected]

        const itemIndex = newListSelected.findIndex(i => i.value === item.value)
        if (itemIndex > -1) {
            newListSelected.splice(itemIndex, 1);
        } else {
            newListSelected.push(item);
        }

        setListSelected(newListSelected);
        onChange(newListSelected);
    }

    const onClick=(event) => {
        if(event.target.getAttribute('name')=== "ecm_base_multiselect"){
            setIsOpen(!isOpen);
        }
    }


    return (
        <div className={`${className ? className : ""} dropdown-multiselect-container `} name={name}>
            <div
                className={`dropdown-multiselect-container__overlay ${isOpen ? "dropdown-multiselect-container__overlay__active" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
            ></div>
            <div name="ecm_base_multiselect" className='dropdown-multiselect-container__header dropdown-multi-input' onClick={(e) => { onClick(e)}}>
                <div name="ecm_base_multiselect" className='dropdown-multiselect-container__header__text'>
                    {listSelected?.length > 0 ? listSelected.map((item, index) => 
                    <Tag className="dropdown-multiselect-container__header__value"
                        closable onClose={()=>{handleListSelected(item)}}
                        key={index}
                    >
                            {item.value}
                    </Tag>) : placeholder}
                </div>
                <div
                    className='dropdown-multiselect-container__header__icon'
                >
                    <FontAwesomeIcon icon={(placement == "top") ? faAngleUp : faAngleDown} onClick={() =>{setIsOpen(!isOpen)}}/>
                </div>
            </div>
            <div className={`dropdown-multiselect-container__select-box ${isOpen ? "open" : ""} ${(placement == "top") ? "dropdown-container__select-box__top" : ""}`}>
                {
                    listItem.map((item, index) => (
                        <div
                            key={index}
                            className={`${checkSelected(item.value) ? "ocr_base_multi-selected" : ""} dropdown-container__select-box__item`}
                            onClick={() => {
                                handleListSelected(item)
                            }}

                        ><div className="ocr_base_multi__title">{item.title}</div>
                        {checkSelected(item.value) && <div className="ocr_base_multi__icon"><FontAwesomeIcon icon={faCheck} /></div>}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


MultiSelect.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.object),
    listItem: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func,
    placement: PropTypes.string,
    placeholder: PropTypes.string
}

export default MultiSelect;