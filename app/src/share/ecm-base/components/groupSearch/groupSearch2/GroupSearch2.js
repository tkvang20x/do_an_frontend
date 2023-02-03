import React from "react";

import { faSearch, faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../GroupSearch.sass";

const GroupSearch2 = (props) => {

  const {onSearchBtnClick = Function(), onClearSearchBtnClick = Function()} = props

  return (
    <div className="group-search">
      <div className="group-search-jumbotron-fluid__search">
        <div className="group-search-jumbotron-fluid__search__top-engine">
          {props.children}
        </div>
        <div className="group-search-jumbotron-fluid__search__bot">
          <button className="mb-btn" onClick={() => onClearSearchBtnClick()}>
            <FontAwesomeIcon icon={faSync} />
            Mặc định
          </button>
          <button
            className="mb-btn mb-btn-blue"
            onClick={() => onSearchBtnClick()}
          >
            <FontAwesomeIcon icon={faSearch} />
            Tìm kiếm
          </button>
        </div>
      </div>
    </div>
  );
};

const Item = (props) => {
  return (
    <div className="group-search-jumbotron-fluid__search-item">{props.children}</div>
  );
};
const ItemTitle = (props) => {
  return (
    <div className="group-search-jumbotron-fluid__search-item____label">{props.children}</div>
  );
};

const ItemInput = (props) => {
  return (
    <div className="group-search-jumbotron-fluid__search-item____input">{props.children}</div>
  );
};

Item.Title = ItemTitle;
Item.Input = ItemInput;

GroupSearch2.Item = Item;

export default GroupSearch2;
