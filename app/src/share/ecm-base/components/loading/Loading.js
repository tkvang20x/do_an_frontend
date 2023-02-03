import React from 'react'
import './Loading.scss'

const Loading = ({isIcon, size}) => {
  if (isIcon){
    return <div className='loading-normal-container'>
      <div className='loading-normal-container__logo' style={{width: size, height: size}}></div>
    </div>
  }

  return (
    <div className='loading-container'>
        <div className='loading-container__overlay'></div>
        <div className='loading-container__logo'></div>
    </div>
  )
}

export default Loading