import React, { useState } from 'react';
import "./RadioButton.scss"


export const RadioButton = ({items = [], multi=false, onChange = Function, onClick = Function, className, classNameItem}) => {

    const [valueRadio, setValueRadio] = useState(null)

    const handleClickItem = (value) => {
        if (!multi) {
            onChange(value)
            onClick(value)
            setValueRadio(value)
            return;
        }
        
        let newValue = []
        if (valueRadio) {
            newValue=[...valueRadio]
            const indexRemove = newValue?.findIndex(item => item === value)
            if (indexRemove > -1) {
                newValue.splice(indexRemove, 1)
            } else{
                newValue.push(value)
            }
        } else{
            newValue.push(value)
        }
        setValueRadio(newValue)
        onChange(newValue)
        
    }

    const checkIsActive = (value) => {
        if (multi) {
            return valueRadio?.find(item => item === value) ? true : false
        }
        return item.value === valueRadio
    }

    return (
        <div className={`ecm-group-radio ${className ? className : ""}`}>
            {items && items.map((item, index) => (
                <RadioItem
                    key={index}
                    value={item.value}
                    title={item.title}
                    description={item.description}
                    onClick={handleClickItem}
                    isActive={checkIsActive(item.value)}
                    className={classNameItem}
                />
            ))}
        </div>
    )
}

export const RadioItem = ({value, title, description, isActive, className, onClick=Function}) => {

    return (
        <div className={`ecm-card__radio ${className ? className : ""}`}>
            <div className={`ecm-card__radio__item ${isActive ? "ecm-card__radio__active" : ""}`}
                onClick={() => onClick(value)}>
                <div className="ecm-card__radio__item__title">{title}</div>
                <div className="ecm-card__radio__item__body">{description}</div>
            </div>
        </div>
    )
}