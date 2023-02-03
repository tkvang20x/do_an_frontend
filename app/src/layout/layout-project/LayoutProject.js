import React from 'react'
import { Outlet } from 'react-router-dom';
import "./LayoutProject.scss"

import MenuProject from "../../common/menu-project/MenuProject";

export let openNotification = null
export let openLoading = null

const LayoutProject = ({prefixPath}) => {

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
