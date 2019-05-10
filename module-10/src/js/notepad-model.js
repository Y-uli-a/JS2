export default class Notepad {
    constructor(notes = []) {
    this._notes = notes;
  }
  static generateUniqueId() {
    return Math.random()
      .toString(36)
      .substring(2, 15) +
      Math.random()
      .toString(36)
      .substring(2, 15);
  }

  get notes() {
    return this._notes
  }

  findNoteById(id) {
    for (const note of this._notes) {
      if (note.id === id) return note;
    }
  }

  saveNote(title, body) {
    const shortId = require('shortid');
    const newNote = {
      id: shortId.generate(),
      title: title,
      body: body,
      priority: 0,
    }
    this._notes.push(newNote);
    console.log(newNote)
    return newNote;
  }

  deleteNote(id) {
    this._notes = this._notes.filter(item => item.id !== id);
    console.log(this._notes)
    /*  for (let i = 0; i < this._notes.length; i += 1) {
        const note = this._notes[i];
        if (note.id === id) {
          this._notes.splice(i, 1);
          return;
        }
      }*/
  }
  updateNoteContent(id, {
    field,
    value
  }) {
    const note = this.findNoteById(id);
    if (!note) return;
    note[field] = value;
  }
  updateNotePriority(id, priority) {
    const note = this.findNoteById(id);
    if (!note) return;
    note.priority = priority;
  }

  filterNotesByQuery(query = "") {
    const foundNotes = [];
    for (const note of this._notes) {
      const noteContent = `${note.body} ${note.title}`;
      const notePresent = noteContent
        .toLowerCase()
        .includes(query.toLowerCase());
      if (notePresent) {
        foundNotes.push(note);
      }
    }
    return foundNotes;
  }

  filterNotesByPriority(priority) {
    const notesFiltered = [];
    for (const note of this._notes) {
      if (note.priority === priority) {
        notesFiltered.push(note);
      }
    }
    return notesFiltered;
  }

  static getPriorityName(priorityId) {
    return Notepad.PRIORITIES[priorityId].name;
  }
}

Notepad.PRIORITIES = {
  0: {
    id: 0,
    value: 0,
    name: "Low"
  },
  1: {
    id: 1,
    value: 1,
    name: "Normal"
  },
  2: {
    id: 2,
    value: 2,
    name: "High"
  }
};