import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import './Modal.scss'

const Modal = (props) => {
    let { title, visible, width, footer, onCancel, children, className } = props

    return (
        <div className={`modal-container ${visible ? "": "modal-container__hidden"} ${className ? className: ""}`}>
            <div className='modal-container__overlay' onClick={onCancel}></div>
            <div className='modal-container__popup' style={{width: width}}>
                <div className='modal-container__popup__header'>
                    <div className='modal-container__popup__header__title'>{title}</div>
                    <div className='modal-container__popup__header__close' onClick={onCancel}><FontAwesomeIcon icon={faClose} /></div>
                </div>
                <div className='modal-container__popup__content'>{children}</div>
                {/* <div className='modal-container__popup__footer'>{footer}</div> */}
            </div>
        </div>
    )
}

export default Modal