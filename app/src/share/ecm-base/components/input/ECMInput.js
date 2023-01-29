import React from 'react'
import './ECMInput.scss'

const ECMInput = ({value, onChange, onEnter}) => {

    function handleKeyDown(event) {
        if (event.key == 'Enter') {
            onEnter()
        }
    }

    return (
        <div className='ecm-input-container'>
            <input className='ecm-input-container__input' onKeyDown={handleKeyDown} value={value} onChange={onChange}></input>
        </div>
    )
}

export default ECMInput