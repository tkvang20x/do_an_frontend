import React from 'react'
import './Loading.scss'

const Loading = () => {
  return (
    <div className='loading-container'>
        <div className='loading-container__overlay'></div>
        <div className='loading-container__logo'></div>
    </div>
  )
}

export default Loading