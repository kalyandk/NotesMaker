import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import Controls from './controls/Controls'

const useStyles = makeStyles(theme => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5)
  },
  dialogTitle: {
    paddingRight: '0px'
  }
}))

const Popup = (props) => {
  
  const { title, subTitle, children, openPopup, setOpenPopup } = props
  const classes = useStyles()

  return (
    <Dialog open={openPopup} maxWidth='md' classes={{paper: classes.dialogWrapper}}>
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: 'flex' }}>
          <div  style={{flexGrow: 1}}>
          <Typography variant='h6' component='div'>{title}</Typography>
          <Typography variant='subtitle2' component='div'>{subTitle}</Typography>
          </div>
          
          <Controls.ActionButton
            color='secondary'
            onClick={() => {
              setOpenPopup(false)
            }}
          >
            <CloseIcon />
          </Controls.ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Popup