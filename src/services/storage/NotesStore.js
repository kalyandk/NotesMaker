let store = {}

const KEYS = {
  notes: 'notes',
  notesID: 'notesID'
}

const storage = {
  getItem: (key) => {
    if (store[key] === undefined)
      return null
    else
      return store[key]
  },
  setItem: (key, value) => {
    store[key] = value
  }
}

export function insertNotes(data) {
  let notes = getAllNotes()
  data['id'] = genNotesID()
  notes.push(data)
  storage.setItem(KEYS.notes, notes)
}

export function updateNotes(data) {
  let notes = getAllNotes()
  let recordIndex = notes.findIndex(x => x.id === data.id)
  notes[recordIndex] = { ...data }
  storage.setItem(KEYS.notes, notes)
}


export function deleteNotes(id) {
  let notes = getAllNotes()
  notes = notes.filter(x => x.id != id)
  storage.setItem(KEYS.notes, notes)
}

// helper [generates id for each record]
export function genNotesID() {
  if (storage.getItem(KEYS.notesID) == null)
    storage.setItem(KEYS.notesID, 0)
  var id = storage.getItem(KEYS.notesID)
  storage.setItem(KEYS.notesID, ++id)
  return id
}

// helper [returns all records]
export function getAllNotes() {
  if (storage.getItem(KEYS.notes) == null)
    storage.setItem(KEYS.notes, [])
  return storage.getItem(KEYS.notes)
}

// console.log('46',getAllNotes());
// insertNotes({title: 'title1'})
// insertNotes({title: 'title1'})
// insertNotes({title: 'title1'})
// console.log(48, getAllNotes());
// console.log(store);


