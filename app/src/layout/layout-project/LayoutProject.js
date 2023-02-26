import React, {useEffect} from 'react'
import { Outlet } from 'react-router-dom';
import "./LayoutProject.scss"
import { useDispatch } from "react-redux";


import MenuProject from "../../common/menu-project/MenuProject";
import LoginAction from '../../redux/action/LoginAction';

export let openNotification = null
export let openLoading = null

const LayoutProject = ({prefixPath}) => {

  const dispatch = useDispatch()

  const checkRole = () => {
    const jwt = require('jsonwebtoken');
    const token = window.localStorage.getItem("token");
    // const secret = '123456';
    const decoded = jwt.decode(token);
    LoginAction.updateDataToken(dispatch, decoded) 
  }

  useEffect(() => {
    checkRole()
  }, [])

  return (
    <div className="ocr-designer__layout-project__container">
      <div className="ocr-designer__layout-project__container__view">
        <Outlet></Outlet>
      </div>
      <div className="ocr-designer__layout-project__container__menu"><MenuProject prefixPath={prefixPath} /></div>
    </div>
  )
}

export default LayoutProject
