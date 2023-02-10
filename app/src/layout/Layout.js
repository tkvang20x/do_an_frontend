import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../share/shared.scss";
import Login from '../components/login/Login';
import './Layout.scss';
import BooksPage from "../components/books/BooksPage";
import Toasts from "../share/ecm-base/components/toasts/Toasts";
import Loading from "../share/ecm-base/components/loading/Loading";
import MenuProject from "../common/menu-project/MenuProject";
import LayoutProject from "./layout-project/LayoutProject";
import DetailBooks from "../components/books/components/detail_books/DetailBooks";

export let openNotification = null
export let openLoading = null
export let addLoading = null
export let subLoading = null
export let numberLoading = 0

const Layout = ({ prefixPath }) => {
  const [toastList, setToastList] = useState([]);
  const [isLoading, setIsLoading] = useState(0)
  const showToast = (type, title, message) => {
      const toastProperties = {
          id: Date.now().toString(),
          type: type,
          title: title,
          message: message,
      };
      setToastList([...toastList, toastProperties]);
  };
  openNotification = showToast

  const _addLoading = () => {
    setIsLoading(isLoading + 1)
  }

  const _subLoading = () => {
    setIsLoading(isLoading - 1)
  }

   //setLoading
  addLoading = _addLoading
  subLoading = _subLoading
  numberLoading = isLoading

  return (
    <div className="do-an-container">
      <Router>
        <Routes>
          <Route exact path={`${prefixPath}/`} element={<Login prefixPath={prefixPath} showToast={showToast} />} />
          <Route exact path={`${prefixPath}/manager`} element={<LayoutProject prefixPath={prefixPath}/>} >
              <Route exact path={`books/list`} element={<BooksPage prefixPath={prefixPath} />} />
              <Route exact path={`books/:code`} element={<DetailBooks prefixPath={prefixPath} />} />
          </Route>
        </Routes>
      </Router>
      <Toasts toastList={toastList} setList={setToastList}></Toasts>
      {(isLoading > 0) && <Loading></Loading>}
    </div>
  );
};

export default Layout;
