import React from 'react';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types'
import "./Tag.scss"

const Tag = (props) => {

    const {closable, className, color, icon, onClose} = props
    const styleTag = () => {
        if(color){
            return {
                color: color,
                border: `${color} 1px solid`
            }
        }
        return {}
    }

    return (
        <div className={`ecm-base-tag-container ${className ? className : ""}`}
         style={styleTag()}
        >
            {icon && <div className="ecm-base-tag-container__icon">{icon}</div>}
            {props.children}
            {closable &&
                <div className="ecm-base-tag-container__close"
                onClick={onClose}
                >
                <FontAwesomeIcon icon={faXmark} />
                </div>}
        </div>
    )
}

Tag.propTypes = {
    closable: PropTypes.bool,
    className: PropTypes.string,
    color: PropTypes.string,
    onClose: PropTypes.func,
    icon: PropTypes.any
}

export default Tag;