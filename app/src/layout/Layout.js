import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../share/shared.scss";
import Login from '../components/login/Login';
import './Layout.scss';
import HomePage from "../components/home_page/HomePage";
import Toasts from "../share/ecm-base/components/toasts/Toasts";
import Loading from "../share/ecm-base/components/loading/Loading";

export let openNotification = null

const Layout = ({ prefixPath }) => {
  const [toastList, setToastList] = useState([]);
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

  return (
    <div className="do-an-container">
      <Router>
        <Routes>
          <Route exact path={`${prefixPath}/`} element={<Login prefixPath={prefixPath} showToast={showToast} />} />
          <Route exact path={`${prefixPath}/homepage`} element={<HomePage prefixPath={prefixPath} showToast={showToast}/>} />
        </Routes>
      </Router>
      <Toasts toastList={toastList} setList={setToastList}></Toasts>
      <div id="loading">
        <Loading></Loading>
      </div>
    </div>
  );
};

export default Layout;
