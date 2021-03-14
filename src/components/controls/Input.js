import { TextField } from '@material-ui/core'
import React from 'react'

const Input = (props) => {

  const { name, label, value, errorMsg=null, onChange, ...other } = props
  return (
    <TextField
      variant='outlined'
      name={name}
      label={label}
      value={value}
      {...(errorMsg && { error: true, helperText: errorMsg })}
      {...other}  
      onChange={onChange}
    />
      )
}

export default Input