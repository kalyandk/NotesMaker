import React, { useEffect, useState } from 'react';
import moment from 'moment'
import { InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar, Tooltip, Typography } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import FilterListIcon from '@material-ui/icons/FilterList';

import notesIcon from '../../assets/notes.png';
import Controls from '../../components/controls/Controls'
import * as noteStore from '../../services/storage/NotesStore'
import useTable from '../../components/useTable';
import NotesForm from './NotesForm';
import PageHeader from '../../components/PageHeader';
import Popup from '../../components/Popup'
import Notification from '../../components/Notification'
import ConfirmDialog from '../../components/ConfirmDialog'
import ViewRecord from '../../components/ViewRecord'
import Filter from '../../components/Filter'

const useStyles = makeStyles(theme => ({
  pageContent: {
      margin: theme.spacing(5),
    padding: theme.spacing(3),
      overflow: 'auto'
  },
  searchInput: {
    width: '75%',
    [theme.breakpoints.down('md')]: {
      width: '65%',
    },
    
  },
  newButton: {
      position: 'absolute',
      right: '0px'
  },
  filterButton: {
    position: 'absolute',
    right: '150px'
  },
  notesIcon: {
    width: '70px',
    height: '70px'
  }
}))

const headCells = [
  { id: 'title', label: 'Title'},
  { id: 'notes', label: 'Your Notes'},
  { id: 'dateCreated', label: 'Date Created'},
  { id: 'actions', label: 'Actions', disableSorting: true},
]


const Notes = () => {
  const classes = useStyles()
  const [ records, setRecords ] = useState(noteStore.getAllNotes())
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [filterFn, setFilterFn] = useState({ fn: items => items })
  const [openPopup, setOpenPopup] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subtitle: ''})
  const [viewRecord, setViewRecord] = useState({ isOpen: false, title: '', notes: '' })
  const [disabled, setDisabled] = useState(false)
  const [state, setState] = useState([{
    startDate: '',
    endDate: '',
    key: 'selection'
  }]);

  useEffect(() => {
    if (records.length === 0)
      setDisabled(true)
    else
      setDisabled(false)
  }, [records])

  const {
    TblHead,
    TblContainer,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFn)
  
  const handleSearch = e => {
    let target = e.target

    setFilterFn({
      fn: items => {
        if (target.value === '')
          return items
        else
          return items.filter(x => x.title.toLowerCase().includes(target.value))
      }
    })
  }

  const addOrEdit = (note, resetForm) => {
    if (note.id == 0)
      noteStore.insertNotes(note)
    else
      noteStore.updateNotes(note)
    resetForm()
    setRecordForEdit(null)
    setOpenPopup(false)
    setRecords([...noteStore.getAllNotes()]) // MY NOTE: This causes rerender
    setNotify({
      isOpen: true,
      message: 'Submitted Successfully',
      type: 'success'
    })
  }

  const openInPopup = item => {
    setRecordForEdit(item)
    setOpenPopup(true)
  }

  const onDelete = id => {
    setConfirmDialog({ ...confirmDialog, isOpen: false })
    noteStore.deleteNotes(id)
    setRecords(noteStore.getAllNotes()) // MY NOTE: This causes rerender
    setNotify({
      isOpen: true,
      message: 'Deleted Successfully',
      type: 'error'
    })
  }

  const handleViewRecord = (e, item) => {
    if (e.target.tagName == 'TD') {
      setViewRecord({
        isOpen: true,
        title: item.title,
        notes: item.notes
      })
    }
  }


  return (
    <>
      <PageHeader
        title='Create Your Notes'
        subTitle='Create, Update and Delete your notes'
        icon={<img src={notesIcon} className={classes.notesIcon}/>}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label='Search Title'
            className={classes.searchInput}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (<InputAdornment position='start'>
                <Search />
              </InputAdornment>)
            }}
          />
          <Controls.Button
            text='Add New'
            variant='outlined'
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true)
              setRecordForEdit(null)
            }}
          />
           <Controls.Button
            text='Filter'
            variant='outlined'
            startIcon={<FilterListIcon />}
            className={classes.filterButton}
            disabled={disabled}
            onClick={() => {
              setOpenFilter(true)
            }}
          />
        </Toolbar>
        {records.length == 0
          ? <Typography variant='h4' color='primary' align='center'>Click on Add New to create notes.</Typography>
          : <TblContainer>
            <TblHead />
            <TableBody>
              {
                recordsAfterPagingAndSorting().map(item => (
                  <Tooltip key={item.id} title='Click to view'>
                    <TableRow name='record' onClick={(e) => handleViewRecord(e, item)}>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.notes.length > 100 ? item.notes.substr(0, 50) + '....CLICK TO VIEW MORE' : item.notes}</TableCell>
                      <TableCell>{moment(item.dateCreated).format('MMM DD, YYYY')}</TableCell>
                      <TableCell>
                        {/* Update */}
                        <Controls.ActionButton color='primary' onClick={() => { openInPopup(item) }}>
                          <EditOutlinedIcon fontSize='small' />
                        </Controls.ActionButton>
                        {/* Delete */}
                        <Controls.ActionButton
                          color='secondary'
                          onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title: 'Are you sure to delete this record',
                              subTitle: "You can't undo this operation",
                              onConfirm: () => onDelete(item.id)
                            })
                          }}
                        >
                          <CloseIcon fontSize='small' />
                        </Controls.ActionButton>
                      </TableCell>
                    </TableRow>
                  </Tooltip>
                ))
              }
            </TableBody>
          </TblContainer>
        }
        <TblPagination />
        <Popup title='Notes' openPopup={openPopup} setOpenPopup={setOpenPopup}>
          <NotesForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
        </Popup>
        <Popup title='Filter' subTitle='Select date range and click submit' openPopup={openFilter} setOpenPopup={setOpenFilter}>
          <Filter filterFn={filterFn} setFilterFn={setFilterFn} setOpenFilter={setOpenFilter} state={state} setState={setState} />
        </Popup>
      </Paper>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
      <ViewRecord viewRecord={viewRecord} setViewRecord={setViewRecord} />
    </>
  )
}

export default Notes
