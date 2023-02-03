import React, { useState } from "react";
import {
  SearchBarSelectItems,
} from "./SearchBarSelectItems";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../GroupSearch.sass";

const GroupSearch1 = ({defaultSearch, listItem, onInputChange = Function(),
                    onSelectedItems= Function(), onInputKeyDown = Function(),
                    onSearchButtonClick =Function()}) => {
  const [searchKey, setSearchKey] = useState(defaultSearch?.input || "");

  const handleInputChange = (event) => {
    setSearchKey(event.target.value);
    onInputChange(e);
  };

  return (
    <div className="group-search">
      <div className="group-search-jumbotron-fluid__search">
        <div className="group-search-jumbotron-fluid__search__top">
          <div className="input-group">
            <SearchBarSelectItems
              selected={defaultSearch?.selected}
              listItem={listItem}
              onSelectedItems={onSelectedItems}
              className="group-search-jumbotron-fluid__search__top__text"
            />

            <input
              id="inputSearchForm"
              type="text"
              className="form-control group-search-input-search"
              placeholder="Tìm kiếm ..."
              value={searchKey}
              onChange={(e) => handleInputChange(e)}
              onKeyDown={(e) => onInputKeyDown(e)}
            />
          </div>
        </div>
        <div className="group-search-jumbotron-fluid__search__bot">
          <button
            className="btn-search mb-btn mb-btn-blue"
            onClick={() =>onSearchButtonClick()}
          >
            <FontAwesomeIcon icon={faSearch} /> Tìm kiếm
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupSearch1;
