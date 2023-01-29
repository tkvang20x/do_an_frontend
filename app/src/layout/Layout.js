import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../share/shared.scss";
import SimpleInput from '../components/SimpleInput';

export let openNotification = null

const Layout = ({ prefixPath }) => {
  const [toastList, setToastList] = useState([]);
  // const showToast = (type, title, message) => {
  //     const toastProperties = {
  //         id: Date.now().toString(),
  //         type: type,
  //         title: title,
  //         message: message,
  //     };
  //     setToastList([...toastList, toastProperties]);
  // };
  // openNotification = showToast

  return (
    <div className="ocr-coor__layout">
      <Router>
        <Routes>
          <Route exact path={`${prefixPath}/`} element={<SimpleInput />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Layout;
