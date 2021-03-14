import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import Controls from './controls/Controls'

const useStyles = makeStyles(theme => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    minWidth: '600px',
    minHeight: '380px',
    position: 'absolute',
    top: theme.spacing(5)
  },
  dialogTitle: {
    paddingRight: '0px',
  },
  dialogContent: {
    fontSize: '1.2em',
    fontWeight: '600'
  }
}))

const ViewRecord = (props) => {
  
  const { viewRecord, setViewRecord } = props
  const classes = useStyles()

  return (
    <Dialog open={viewRecord.isOpen} maxWidth='md' classes={{paper: classes.dialogWrapper}}>
      <DialogTitle className={classes.dialogTitle}>
        <div style={{display: 'flex'}}>
          <Typography variant='h4' component='div' style={{flexGrow: 1}}>{viewRecord.title}</Typography>
          <Controls.ActionButton
            color='secondary'
            onClick={() => {
              setViewRecord({...viewRecord, isOpen: false})
            }}
          >
            <CloseIcon />
          </Controls.ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
        {viewRecord.notes}
      </DialogContent>
    </Dialog>
  )
}

export default ViewRecord