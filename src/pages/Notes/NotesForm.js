import React, { useEffect } from 'react'

import { useForm, Form } from '../../components/useForm'
import Controls from '../../components/controls/Controls'
import { Grid } from '@material-ui/core'

const initialFValues = {
  id: 0,
  title: '',
  notes: '',
  dateCreated: new Date(),
}

const NotesForm = (props) => {
  const { addOrEdit, recordForEdit } = props

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFValues)

  
  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    temp.title = fieldValues.title !== '' ? '' : "You can't submit an empty notes"
    temp.notes = fieldValues.notes !== '' ? '' : "You can't submit an empty notes"
    setErrors({
      ...temp
    })
    return Object.values(temp).every(x => x === '')
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (validate())
    {
      addOrEdit(values, resetForm)
    }
  }

  useEffect(() => {
    if (recordForEdit != null) {
      setValues({...recordForEdit})
    }
  }, [recordForEdit])

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <Controls.Input name='title' label='Title' value={values.title} errorMsg={errors.title} onChange={handleInputChange} />
          <Controls.Input name='notes' label='Write notes' multiline rows={6} value={values.notes} errorMsg={errors.notes} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Controls.DatePicker name='dateCreated' label='Apply Date' value={values.dateCreated} onChange={handleInputChange} />
          <div>
            <Controls.Button text='Submit' type='submit' />
            <Controls.Button text='reset' color='default' onClick={resetForm}/>
          </div>
        </Grid>
      </Grid>
    </Form>
  )
}

export default NotesForm
