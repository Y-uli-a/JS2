import './sass/main.scss';


const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

const initialNotes = [{
    id: 'id-1',
    title: 'JavaScript essentials',
    body: 'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body: 'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-3',
    title: 'Get comfy with Frontend frameworks',
    body: 'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-4',
    title: 'Winter clothes',
    body: "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW,
  },
];

class Notepad {
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
    const newNote = {
      id: Notepad.generateUniqueId(),
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

const notepad = new Notepad(initialNotes);

const refs = {
  noteList: document.querySelector('.note-list'),
  editor: document.querySelector('.note-editor'),
  editorInput: document.querySelector('.note-editor__input'),
  search: document.querySelector('.search-form__input')
};

const createNoteItem = ({
  id,
  title,
  body,
}) => {
  const content = createNoteContent({
    title,
    body,
  });
  const footer = createNoteFooter();
  const noteListItem = document.createElement('li');
  noteListItem.classList.add('note-list__item');
  noteListItem.dataset.id = id;
  const noteStr = document.createElement('div');
  noteStr.classList.add('note');
  noteStr.append(content, footer)
  noteListItem.append(noteStr)
  return noteListItem;
}

const createNoteContent = ({
  title,
  body
}) => {
  const noteContent = document.createElement('div');
  noteContent.classList.add('note__content');

  const noteTitle = document.createElement('h2');
  noteTitle.classList.add('note__title');
  noteTitle.textContent = title;

  const noteBody = document.createElement('p');
  noteBody.classList.add('note__body');
  noteBody.textContent = body;

  noteContent.append(noteTitle, noteBody);
  return noteContent;
}

const createNoteFooter = (note) => {
  const noteFooter = document.createElement('footer');
  noteFooter.classList.add('note__footer');

  const firstNoteSection = document.createElement('section');
  firstNoteSection.classList.add('note__section');

  const decreasePriorityButton = document.createElement('button');
  decreasePriorityButton.classList.add('action');
  decreasePriorityButton.dataset.action = NOTE_ACTIONS.DECREASE_PRIORITY;

  const decreaseIcon = document.createElement('i');
  decreaseIcon.classList.add('material-icons', 'action__icon');
  decreaseIcon.textContent = "expand_less";

  const increasePriorityButton = document.createElement('button');
  increasePriorityButton.classList.add('action');
  increasePriorityButton.dataset.action = NOTE_ACTIONS.INCREASE_PRIORITY;

  const increaseIcon = document.createElement('i');
  increaseIcon.classList.add('material-icons', 'action__icon');
  increaseIcon.textContent = "expand_more";

  const notePriority = document.createElement('span');
  notePriority.classList.add('note__priority');

  const secondNoteSection = document.createElement('section');
  secondNoteSection.classList.add('note__section');

  const editNoteButton = document.createElement('button');
  editNoteButton.classList.add('action');
  editNoteButton.dataset.action = NOTE_ACTIONS.EDIT;

  const editIcon = document.createElement('i');
  editIcon.classList.add('material-icons', 'action__icon');
  editIcon.textContent = 'edit';

  const deleteNoteButton = document.createElement('button');
  deleteNoteButton.classList.add('action');
  deleteNoteButton.dataset.action = NOTE_ACTIONS.DELETE;

  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('material-icons', 'action__icon');
  deleteIcon.textContent = 'delete';

  decreasePriorityButton.appendChild(decreaseIcon);
  increasePriorityButton.appendChild(increaseIcon);
  firstNoteSection.append(decreasePriorityButton, increasePriorityButton);

  editNoteButton.appendChild(editIcon);
  deleteNoteButton.appendChild(deleteIcon);
  secondNoteSection.append(editNoteButton, deleteNoteButton)
  noteFooter.append(firstNoteSection, secondNoteSection);
  return noteFooter;
}

const renderNoteItems = (listRef, note) => {
  const listItemsCreated = note.map(item => createNoteItem(item));
  listRef.innerHTML = '';
  listRef.append(...listItemsCreated);
}

const addItemToList = (listRef, note) => {
  const noteItem = createNoteItem(note);
  listRef.appendChild(noteItem);
}

//Handlers

const handleEditorSubmit = event => {
  event.preventDefault();
  const [title, body] = event.currentTarget.elements;
  const titleValue = title.value.trim();
  const bodyValue = body.value.trim();

  if (bodyValue === "" || titleValue === "") {
    return alert('Необходимо заполнить все поля!');
  }

  const savedNote = notepad.saveNote(titleValue, bodyValue)
  addItemToList(refs.noteList, savedNote);
  event.currentTarget.reset();
}
const handleFilterChange = event => {
  console.log(event.target.value);

  const filteredItems = notepad.filterNotesByQuery(event.target.value);
  console.table(filteredItems)
  renderNoteItems(refs.noteList, filteredItems);
};


const removeNoteItem = noteElement => {
  const parentNoteItem = noteElement.closest('.note-list__item');
  console.log(parentNoteItem)
  const id = parentNoteItem.dataset.id;

  notepad.deleteNote(id);
  parentNoteItem.remove();
};

const handleListClick = ({
  target
}) => {
  if (target.nodeName !== 'I') return;
  const action = target.closest('button').dataset.action;
  switch (action) {
    case NOTE_ACTIONS.DELETE:
      removeNoteItem(target);
      break;
    default:
      console.log('invalid action!');
  }
};

renderNoteItems(refs.noteList, initialNotes);

refs.editor.addEventListener('submit', handleEditorSubmit)
refs.search.addEventListener('input', handleFilterChange);
refs.noteList.addEventListener('click', handleListClick);
