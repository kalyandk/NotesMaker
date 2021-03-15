import React from 'react'

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';

import { makeStyles } from '@material-ui/core';

import Controls from './controls/Controls';

const useStyles = makeStyles(theme => ({
  filterButton: {
    position: 'absolute',
    right: '0px',
    bottom:'0px'
  },
  clearButton: {
    position: 'absolute',
    right: '100px',
    bottom:'0px'
  }
}))

const Calendar = (props) => {
  const classes = useStyles()
  const {setFilterFn, setOpenFilter, state, setState} = props

  const handleSubmit = () => {
    setFilterFn({
      fn: items => {
        if (state[0].startDate === '' && state[0].endDate === '') {
          return items
        }
        else {
          return items.filter(item => (item.dateCreated >= state[0].startDate && item.dateCreated <= state[0].endDate))
        }
      }
    })
    setOpenFilter(false)
  }

  const handleClear = () => {
    setState([{ startDate: '', endDate: '', key: 'selection'}])
  }

  return (
    <>
      <DateRangePicker
      onChange={item => setState([item.selection])}
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      months={1}
      ranges={state}
      direction="vertical"
      />
      <Controls.Button
        text='Clear'
        className={classes.clearButton}
        color='secondary'
        onClick={handleClear}
      />
      <Controls.Button
        text='Filter'
        className={classes.filterButton}
        onClick={handleSubmit}
      />
    </>
    
  )
}

export default Calendar
