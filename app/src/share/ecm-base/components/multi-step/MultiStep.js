import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MultiStep.scss"


const MultiStep = ({items = []}) => {
    return (
        <>
            <div className="ecm-multi-step-container">
                <div className="ecm-multi-step-container__row">
                    <ul id="ecm-multi-step-progressbar-icon">
                        {items && items.map((item, index) => {
                            return (
                                <li style={{width: (100 /items.length)+ "%"}} key={index}><FontAwesomeIcon icon={item.icon} /></li>
                            )
                        })}
                    </ul>
                </div>
                <div className="ecm-multi-step-container__row">
                    <ul id="ecm-multi-step-progressbar">
                        {items && items.map((item, index) => {
                            return (
                                <li
                                    className={item.isActive ? "ecm-multi-step-active em-multi-step-check" : "em-multi-step-check"}
                                    style={{width: (100 /items.length)+ "%"}}
                                    key={index}>
                                    {item.name}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default MultiStep