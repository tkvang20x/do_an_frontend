import React from 'react';
import { faXmark, faClipboardCheck, faUserCheck, faFileZipper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MultiStep.scss"


const MultiStepTemplate = () => {
    return (
        <>
            <div className="ecm-multi-step-container">
                <div className="ecm-multi-step-container__row">
                    <ul id="ecm-multi-step-progressbar-icon">
                        <li><FontAwesomeIcon icon={faXmark} /></li>
                        <li><FontAwesomeIcon icon={faFileZipper} /></li>
                        <li><FontAwesomeIcon icon={faUserCheck} /></li>
                        <li><FontAwesomeIcon icon={faClipboardCheck} /></li>
                    </ul>
                </div>
                <div className="ecm-multi-step-container__row">
                    <ul id="ecm-multi-step-progressbar">
                        <li className="ecm-multi-step-active em-multi-step-check"><strong>Account</strong></li>
                        <li className="ecm-multi-step-active em-multi-step-check"><strong>Personal</strong></li>
                        <li className="em-multi-step-check"><strong>Image</strong></li>
                        <li className="em-multi-step-check"><strong>Finish</strong></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default MultiStepTemplate