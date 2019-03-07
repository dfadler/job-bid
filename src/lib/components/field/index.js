
import React from 'react'

export default ({ label, display = 'block', component: C, ...rest }) => {
  const field = <label>{label} <C {...rest} /></label>
  const className = 'field-group'
  return display === 'inline'
    ? <span className={className}>{field}</span>
    : <div className={className}>{field}</div>
}