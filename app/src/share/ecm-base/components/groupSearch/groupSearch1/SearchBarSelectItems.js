import React, { useState, useEffect } from "react";
import DropDown from "../../dropdown-v2/DropDown";
import PropTypes from 'prop-types'

/**
 *  Selected Items for search bar
 * @param {*} param0
 * @returns
 */
export const SearchBarSelectItems = ({
  className,
  selected,
  listItem,
  onSelectedItems,
}) => {
  const [currentSelected, setCurrentSelected] = useState(selected|| null);

  const handleSelectItem = (name, value) => {
    setCurrentSelected(value);
    onSelectedItems(name, value);
  };

  return (
    <div className="input-group-prepend group-search-jumbotron-fluid__search__top__label">
      <DropDown
        className={`${className ? className : ""}`}
        listItem={listItem || []}
        selected={currentSelected}
        onSelected={(name, value) => handleSelectItem(name, value)}
      />
    </div>
  );
};

SearchBarSelectItems.propTypes = {
  className: PropTypes.string,
  selected: PropTypes.string,
  listItem: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectedItems: PropTypes.func.isRequired
}
