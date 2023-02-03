import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import "./Switch.scss";

const Switch = ({checked, checkedChildren, unCheckedChildren, onChange = Function}) => {

    const [value, setValue] = useState(checked || false)

    useEffect(() => {
        setValue(checked || false)
    }, [checked])

    const handleClick = () => {
        setValue(!value)
        onChange(!value)
    }

    return (
        <div className={`${value ? "ecm-switch-click": ""}`}>
            <div className={`ecm-switch-container`}
                onClick={handleClick}
            >
                {checkedChildren && <span className="ecm-switch-on"><b>{checkedChildren}</b></span>}
                {unCheckedChildren && <span className="ecm-switch-off"><b>{unCheckedChildren}</b></span>}
                <div className="ecm-switch-circle"></div>
            </div>
        </div>
    )
}

Switch.propTypes = {
    checked: PropTypes.bool,
    checkedChildren: PropTypes.any,
    unCheckedChildren: PropTypes.any,
    onChange: PropTypes.func
}

export default Switch;