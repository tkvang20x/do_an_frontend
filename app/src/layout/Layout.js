import React, { useState, useEffect } from "react";
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
import UserPage from "../components/user/UserPage";
import DetailUser from "../components/user/components/get_detail_user/DetailUser";
import VoucherPage from "../components/voucher/VoucherPage";
import CreateVoucher from "../components/voucher/components/create_voucher/CreateVoucher";
import DetailVoucher from "../components/voucher/components/detail_voucher/DetailVoucher";
import UpdateVoucher from "../components/voucher/components/update_voucher/UpdateVoucher";
import ManagerPage from "../components/manager/ManagerPage";
import ManagerInfoPage from "../components/manager/manager_info/ManagerInfoPage ";

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
          <Route exact path={`${prefixPath}/manager`} element={<LayoutProject prefixPath={prefixPath} />} >
          <Route exact path={`books/list`} element={<BooksPage prefixPath={prefixPath} />} />
          <Route exact path={`books/:code`} element={<DetailBooks prefixPath={prefixPath} />} />
          <Route exact path={`user/list`} element={<UserPage prefixPath={prefixPath} />} />
          <Route exact path={`user/:code`} element={<DetailUser prefixPath={prefixPath} />} />
          <Route exact path={`voucher/list`} element={<VoucherPage prefixPath={prefixPath} />} />
          <Route exact path={`voucher/create`} element={<CreateVoucher prefixPath={prefixPath} />} />
          <Route exact path={`voucher/:voucher_id`} element={<DetailVoucher prefixPath={prefixPath} />} />
          <Route exact path={`voucher/:voucher_id/update`} element={<UpdateVoucher prefixPath={prefixPath} />} />
          <Route exact path={`manager-list`} element={<ManagerPage prefixPath={prefixPath} />} />
          </Route>
          <Route exact path={`${prefixPath}/info-manager`} element={<ManagerInfoPage prefixPath={prefixPath}></ManagerInfoPage>}></Route>
        </Routes>
      </Router>
      <Toasts toastList={toastList} setList={setToastList}></Toasts>
      {(isLoading > 0) && <Loading></Loading>}
    </div>
  );
};

export default Layout;
