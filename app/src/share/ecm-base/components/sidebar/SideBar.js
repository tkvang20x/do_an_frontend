import React from 'react'
import './SideBar.scss'

const SideBar = () => {
  return (
    <div className='sidebar-container'>
        <div className='sidebar-container__section-top'>
            <div className='sidebar-container__section-top__logo'></div>
            <div className='sidebar-container__section-top__title'></div>    
        </div>
        <div className='sidebar-container__section-content'></div>
        <div className='sidebar-container__section-bottom'>
            <button className='expand'></button>    
        </div>
    </div>
  )
}

export default SideBar