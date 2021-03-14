import React from 'react'
import { AppBar, Badge, Grid, IconButton, InputBase, makeStyles, Toolbar, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#76448A',
    transform: 'translateZ(0)',
    color: '#fff'
  },
}))

const Header = () => {
  const classes = useStyles()

  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar>
        <Typography variant='h3'>Notes Maker</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
