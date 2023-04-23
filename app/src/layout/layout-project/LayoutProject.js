import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import "./LayoutProject.scss"
import { useDispatch, useSelector } from "react-redux";
import MenuProject from "../../common/menu-project/MenuProject";
import LoginAction from '../../redux/action/LoginAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import ManagerAction from '../../redux/action/ManagerAction';


export let openNotification = null
export let openLoading = null

const LayoutProject = ({ prefixPath }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const checkRole = () => {
    const jwt = require('jsonwebtoken');
    const token = window.localStorage.getItem("token");
    // const secret = '123456';
    const decoded = jwt.decode(token);
    LoginAction.updateDataToken(dispatch, decoded)
  }

  const tokenDecode = useSelector(state => state.loginReducer.dataToken)

  useEffect(() => {
    checkRole()
  }, [])

  // useEffect(() => {
  //   ManagerAction.getDetailManagerAction(dispatch, tokenDecode?.code)
  // }, [tokenDecode])



  const handleLogout = () => {
    window.localStorage.setItem("token", "")
    navigate(`${prefixPath}/`);
  }

  const handleOpenInfoManager = () => {
    navigate(`${prefixPath}/info-manager/${tokenDecode.code}`)
  }

  return (
    <div className="ocr-designer__layout-project__container">
      <div className="ocr-designer__layout-project__container__view">
        <Outlet></Outlet>
      </div>
      <div className="ocr-designer__layout-project__container__menu">
        <MenuProject prefixPath={prefixPath} />
        <div className='ocr-designer__layout-project__container__manager-info'>
          <div className='ocr-designer__layout-project__container__manager-info__icon' onClick={handleOpenInfoManager}>
            <FontAwesomeIcon style={{ height: "35px", marginBottom: "10px", cursor: "pointer" }} icon={faCircleUser}></FontAwesomeIcon>
          </div>
          <div className='ocr-designer__layout-project__container__manager-info__username' onClick={handleOpenInfoManager}>
            {tokenDecode?.username}
          </div>
          <div className='ocr-designer__layout-project__container__manager-info__logout' onClick={handleLogout}>
            Đăng xuất
          </div>
          <div className='ocr-designer__layout-project__container__manager-info__icon'>
            <FontAwesomeIcon style={{ height: "18px", marginTop: "10px" }} icon={faAnglesLeft}></FontAwesomeIcon>
          </div>
        </div>
      </div>

    </div>
  )
}

export default LayoutProject
