import React from 'react'
import './Button.scss'

const Button = ({children, type, content, onClick}) => {
  return (
    <button
        className={`ecm-button ecm-button__${type}`}
        onClick={onClick}
    >{children}</button>
  )
}

export default Button