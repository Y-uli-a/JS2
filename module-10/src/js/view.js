import {NOTE_ACTIONS} from './utils/constants';
import Notepad from './notepad-model';

 export const createNoteItem = ({
  id,
  title,
  body,
  priority,
}) => {
  const content = createNoteContent({
    title,
    body,
  });
  const footer = createNoteFooter(priority);
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

const createNoteFooter = (priority) => {
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
  notePriority.textContent = Notepad.getPriorityName(priority);

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
  firstNoteSection.append(decreasePriorityButton, increasePriorityButton, notePriority);

  editNoteButton.appendChild(editIcon);
  deleteNoteButton.appendChild(deleteIcon);
  secondNoteSection.append(editNoteButton, deleteNoteButton)
  noteFooter.append(firstNoteSection, secondNoteSection);
  return noteFooter;
}

export const renderNoteItems = (listRef, note) => {
  const listItemsCreated = note.map(item => createNoteItem(item));
  listRef.innerHTML = '';
  listRef.append(...listItemsCreated);
}

export const addItemToList = (listRef, note) => {
  const noteItem = createNoteItem(note);
  listRef.appendChild(noteItem);
}


export const getRefs = () => ({
  noteList: document.querySelector('.note-list'),
  editor: document.querySelector('.note-editor'),
  editorInput: document.querySelector('.note-editor__input'),
  search: document.querySelector('.search-form__input')
});