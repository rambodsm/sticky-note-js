const notesContainer = document.querySelector('#app')
const addNoteBtn = document.querySelector('.add-note')

getNotes().forEach((item) => {
    const noteElement = createNoteElement(item.id, item.content)
    notesContainer.insertBefore(noteElement, addNoteBtn)
})

addNoteBtn.addEventListener('click', () => addNote())

function getNotes() {
  return JSON.parse(localStorage.getItem('notes') || '[]')
}

function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes))
}

function createNoteElement(id, content) {
    const noteElement = document.createElement('textarea')

    noteElement.classList.add('note')

    noteElement.value = content

    noteElement.addEventListener('change', () => {
        updateNote(id, noteElement.value)
    })

    noteElement.addEventListener('dblclick', () => {
        deleteNote(id, noteElement)
    })

    return noteElement
}

function addNote() {
    const notes = getNotes()

    const noteItem = {
        id: Math.floor(Math.random() * 10000),
        content: ''
    }

    const noteElement = createNoteElement(noteItem.id, noteItem.content)
    notesContainer.insertBefore(noteElement, addNoteBtn)

    notes.push(noteItem)
    saveNotes(notes)
}

function updateNote(id, newContent) {
    const notes = getNotes()

    const updatedNote = notes.filter((item) => item.id == id)[0]

    updatedNote.content = newContent

    saveNotes(notes)
}

function deleteNote(id, element) {
    const notes = getNotes().filter((item) => item.id != id)

    saveNotes(notes)
    notesContainer.removeChild(element)
}