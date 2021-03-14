import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'

// Re usable form

export const useForm = (initialFValues) => {

  const [values, setValues] = useState(initialFValues)
  const [errors, setErrors] = useState({})

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const resetForm = () => {
    setValues(initialFValues)
    setErrors({})
  }

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  }
} 

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
      margin: theme.spacing(1),
      padding: theme.spacing(0)
    }
  }
}))

export function Form(props) {

  const classes = useStyles()
  const { children, ...other } = props
  
  return (
    <form className={classes.root} autoComplete='off' {...other}>
      {props.children}
    </form>
  )
}
