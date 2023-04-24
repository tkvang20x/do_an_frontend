import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import "./LayoutProject.scss"
import { useDispatch, useSelector } from "react-redux";
import MenuProject from "../../common/menu-project/MenuProject";
import LoginAction from '../../redux/action/LoginAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import logo from '../../share/image/logo.jpg';


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

  const [isExpand, setIsExpand] = useState(true);


  const handleHiddenSideBar = () => {
    setIsExpand(!isExpand)
  }

  return (
    <div className="do-an__layout-project__container">
      <div className={isExpand ? "do-an__layout-project__container__view-expand" : "do-an__layout-project__container__view-inexpand"}>
        <Outlet></Outlet>
      </div>
      <div className={`do-an__layout-project__container__menu ${isExpand ? "" : "inexpand"}`}>
      <div className='do-an__layout-project__container__logo'>
        <img className={`do-an__layout-project__container__logo__image ${isExpand ? "" : "logo-inexpand"}`} src={logo}></img>
        {/* <div className='do-an__layout-project__container__logo__title'>
              QUẢN LÝ THƯ VIỆN
        </div> */}
      </div>
        <MenuProject prefixPath={prefixPath} isExpand={isExpand}/>
        <div className={`do-an__layout-project__container__manager-info ${isExpand ? "" : "manager-info-inexpand"}`}>
          <div title='Thông tin cá nhân' className='do-an__layout-project__container__manager-info__icon' onClick={handleOpenInfoManager}>
            <FontAwesomeIcon style={{ height: "35px", marginBottom: "10px", cursor: "pointer", color:"white" }} icon={faCircleUser}></FontAwesomeIcon>
          </div>
          <div className={`do-an__layout-project__container__manager-info__username ${isExpand ? "" : "username-inexpand"}`} onClick={handleOpenInfoManager}>
            {tokenDecode?.username}
          </div>
          <div title='Đăng xuất' className={`do-an__layout-project__container__manager-info__logout ${isExpand ? "" : "logout-inexpand"}`} onClick={handleLogout}>
            Đăng xuất
          </div>
          <div className='do-an__layout-project__container__manager-info__icon-inexpand'>
            <FontAwesomeIcon style={{ height: "18px", marginTop: "10px" }} onClick={handleHiddenSideBar} icon={ isExpand===true ? faAnglesLeft : faAnglesRight}></FontAwesomeIcon>
          </div>
        </div>
      </div>

    </div>
  )
}

export default LayoutProject
