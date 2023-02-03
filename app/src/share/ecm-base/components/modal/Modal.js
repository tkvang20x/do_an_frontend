import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types"
import './Modal.scss'

const Modal = (props) => {
    let { title, visible, width, footer, onCancel, children, className } = props

    return (
        <div className={`modal-container ${visible ? "": "modal-container__hidden"}`}>
            <div className='modal-container__overlay' onClick={onCancel}></div>
            <div className={`modal-container__popup ${className ? className: ""}`} style={{width: width}}>
                <div className='modal-container__popup__header'>
                    <div className='modal-container__popup__header__title'>{title}</div>
                    <div className='modal-container__popup__header__close' onClick={onCancel}><FontAwesomeIcon icon={faClose} /></div>
                </div>
                <div className='modal-container__popup__content ecm-base__scroll'>{children}</div>
                {footer && <div className='modal-container__popup__footer'>{footer}</div>}
            </div>
        </div>
    )
}

Modal.propTypes = {
    title: PropTypes.string,
    visible: PropTypes.bool.isRequired,
    width: PropTypes.any,
    onCancel: PropTypes.func,
    children: PropTypes.any,
    className: PropTypes.string,
    footer: PropTypes.any
}

export default Modal