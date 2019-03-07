
import React from 'react'

export const InputRadio = ({ value, name, checked, onChange, required }) =>
  <input onChange={onChange} type='radio' value={value} name={name} checked={checked} required={required} />

export const InputText = ({ value, name, onChange, required }) =>
  <input onChange={onChange} type='text' value={value} required={required} />

export const InputDate = ({ value, name, onChange, required }) =>
  <input onChange={onChange} type='date' name={name} value={value} required={required} />

export const InputNumber = ({ value, name, onChange, min, max, step }) =>
  <input required onChange={onChange} name={name} type="number" min={min} step={step} max={max} />