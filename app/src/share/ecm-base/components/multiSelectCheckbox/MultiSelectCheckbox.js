import React, { useState, useEffect, useRef } from "react";
import "./MultiSelectCheckbox.scss"
import PropTypes from "prop-types";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";


const MultiSelectCheckbox = ({ options, placeholder, onChange, className="", defaultValue = [] }) => {
  const selectRef = useRef(null);
  const [isClicked, setIsClicked] = useDetectOutsideClick(selectRef, false);
  const [inputsActiveStatus, setInputsActiveStatus] = useState(null);
  const [listContentSelected, setListContentSelected] = useState([]);
  const [value, setValue] = useState([]);

  // *** init inputs' active status on mounted
  useEffect(() => {
    const newInputsActiveStatus = {};
    const newlListContentSelected = [];
    options.forEach(option => {
      newInputsActiveStatus[option.value] = false;
      if(defaultValue.includes(option.value))
      {
        newInputsActiveStatus[option.value] = true;
        newlListContentSelected.push(option.content);
      }
    });
    setInputsActiveStatus(newInputsActiveStatus);
    setListContentSelected(newlListContentSelected);
    setValue(defaultValue);
  },[]);

  const toggleIsClicked = () => {
    setIsClicked(!isClicked);
  };

  const updateValue = (inputVal, option) => {
    const newValue = [...value];
    const newListContent = [...listContentSelected]

    if (inputVal === false) {
      const optionIndex = newValue.indexOf(option.value);
      const contentIndex = newListContent.indexOf(option.content);
      if (optionIndex >= 0) {
        newValue.splice(optionIndex, 1);
      }
      if (contentIndex >= 0) {
        newListContent.splice(contentIndex, 1);
      }
    } else {
      newValue.push(option.value);
      newListContent.push(option.content);
    }

    setValue(newValue);
    setListContentSelected(newListContent);
    onChange(newValue);
  };

  const handleChange = (option) => {
    const newInputsActiveStatus = { ...inputsActiveStatus };

    newInputsActiveStatus[option.value] = !newInputsActiveStatus[option.value];
    setInputsActiveStatus(newInputsActiveStatus);

    updateValue(newInputsActiveStatus[option.value], option);
  };

  return (
        <div className={`multi-select-checkbox-container ${className}`}>
            <div className="multi-select-checkbox-container__content" onClick={toggleIsClicked}>
                <span className="multi-select-checkbox-container__content__placeholder" >
                {listContentSelected?.length > 0 ? listContentSelected.join(", ") : placeholder}
                </span>
                <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
            </div>
            {options && inputsActiveStatus !== null && (
              <ul className={isClicked ? "multi-select-checkbox-container__option" : "multi-select-checkbox-container__dp-none"} ref={selectRef}>
              {options.map((option, index) => (
                  <li key={index}>
                  <input
                      id={option.content}
                      type="checkbox"
                      value={option.value}
                      checked={inputsActiveStatus[option.value]}
                      onChange={() => handleChange(option)}
                  />
                  <label htmlFor={option.content}>{option.content}</label>
                  </li>
              ))}
              </ul>
          )}
      </div>
  );
};

MultiSelectCheckbox.propTypes = {
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  defaultValue: PropTypes.arrayOf(PropTypes.object)
};

export default MultiSelectCheckbox;
