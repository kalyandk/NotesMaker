import React from 'react'
import { makeStyles, Paper, Typography, Card } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#F5EEF8'
  },
  pageHeader: {
    padding: theme.spacing(4),
    display: 'flex',
    marginBottom: theme.spacing(2) 
  },
  pageTitle: {
    paddingLeft: theme.spacing(4),
    '& .MuiTypography-subtitle2': {
      opacity: '0.6'
    }
  }
}))

const PageHeader = (props) => {

  const classes = useStyles()
  const { title, subTitle, icon } = props

  return (
    <Paper elevation={0} square className={classes.root}>
      <div className={classes.pageHeader}>
          {icon}
        <div  className={classes.pageTitle}>
          <Typography variant='h6' component='div'>{title}</Typography>
          <Typography variant='subtitle2' component='div'>{subTitle}</Typography>
        </div>
      </div>
    </Paper>
  )
}

export default PageHeader
