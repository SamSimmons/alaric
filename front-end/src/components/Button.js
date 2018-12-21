import React from 'react'

const Button = ({ label, theme, icon }) =>
  <button type='btn' className={`btn--${theme}`}>
    <span>{label}</span>
    {icon}
  </button>

export default Button
