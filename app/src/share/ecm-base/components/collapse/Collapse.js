import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import './Collapse.scss'

const Collapse = (props) => {
    const {className, name, children} = props
    const [isExpand, setIsExpand] = useState(false)

    return (
        <div className={`ecm-base__collapse-container ${className}`}>
            <div className={`ecm-base__collapse-container__header ${className}`}
                onClick={() => {setIsExpand(!isExpand)}}
            >
                <div className='ecm-base__collapse-container__header__name'>
                    {name}
                </div>
                <div
                    className={`ecm-base__collapse-container__header__icon ${isExpand ? "expand": ""}`}
                >
                    <FontAwesomeIcon icon={faAngleRight}/>
                </div>
            </div>
            <div className={`ecm-base__collapse-container__content ${isExpand? "show": "hidden"}`}>
                {children}
            </div>
        </div>
    )
}

Collapse.propTypes = {
    className: PropTypes.string,
    name: PropTypes.any.isRequired
}

export default Collapse