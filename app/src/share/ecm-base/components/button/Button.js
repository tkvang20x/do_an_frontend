import React from 'react'
import './Button.scss'

const Button = ({className, children, type, onClick, title, id="", mode="button"}) => {
  return (
    <button
        className={`ecm-button ecm-button__${type} ${className|| ""}`}
        onClick={onClick}
        title={title}
        type={mode}
        id={id}
    >{children}</button>
  )
}

export default Button