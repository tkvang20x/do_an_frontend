import React, {useState} from 'react'
import {faAngleLeft, faSignOutAlt, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './SideBar.scss'

const SideBar = (props) => {
  const [isExpand, setIsExpand] = useState(true);

  const hanldExpand = () => {
    setIsExpand(!isExpand);
    props.changeExpand(!isExpand);
  }

  return (
    <div className={`sidebar-container ${isExpand ? "expand" : "inexpand"}`}>
        <div className='sidebar-container__section-top'>
            <div className='sidebar-container__section-top__logo'/>
            <div className='sidebar-container__section-top__title'>
                <div className='sidebar-container__section-top__title__top'>ECM</div>
                <div className='sidebar-container__section-top__title__bottom'>BASE MF</div>
            </div>    
        </div>
        <div className={isExpand ? 'sidebar-container__section-content': "sidebar-container__section-content-inexpand"}>
            {props?.children}
        </div>
        <div className='sidebar-container__section-bottom'>
            <div className="sidebar-container__section-bottom__icon-user" data-toggle="tooltip" data-placement="right" title={props?.userName}>
                <FontAwesomeIcon icon={faUserCircle} />
             </div>
            <div onClick={props.logout} className={`sidebar-container__section-bottom__group-logout`} data-toggle="tooltip" data-placement="right" title="Đăng xuất">
              <div className={`${isExpand ? "sidebar-container__section-bottom__group-logout__info":"sidebar-container__section-logout-inexpand"}`}>
                {props?.userName}
              </div>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </div>
            <div className='sidebar-container__section-bottom__expand' onClick={() => hanldExpand() }>
              <FontAwesomeIcon icon={faAngleLeft} />
            </div>
        </div>
    </div>
  )
}

//Connect to store
export default SideBar;