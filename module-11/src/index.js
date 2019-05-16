import { Notyf } from 'notyf';
import './sass/main.scss';
import 'notyf/notyf.min.css';
import MicroModal from 'micromodal';
import './sass/libs/micromodal.scss';
import noteTemplate from './templates/note.hbs';
import initialNotes from './assets/notes.json';

import {NOTE_ACTIONS} from './js/utils/constants';
import Notepad from './js/notepad-model';
import {getRefs, createNoteItemMarkup, addItemToList} from './js/view.js';

const notepad = new Notepad(initialNotes);
const notyf = new Notyf();
const refs = getRefs();
MicroModal.init();
//Handlers

const handleEditorSubmit = event => {
  event.preventDefault();
  const [title, body] = event.currentTarget.elements;
  const titleValue = title.value.trim();
  const bodyValue = body.value.trim();
  if (bodyValue === "" || titleValue === "") {
    return notyf.error('Заполните поля редактора!');
  }
  const savedNote = notepad.saveNote(titleValue, bodyValue)
  addItemToList(refs.noteList, savedNote);
  notyf.success('Заметка успешно добавлена');
  MicroModal.close('note-editor-modal');
  event.currentTarget.reset();
}

const handleFilterChange = event => {
  const filteredItems = notepad.filterNotesByQuery(event.target.value);
  console.table(filteredItems)
  renderNoteItems(refs.noteList, filteredItems);
;
};

const handleModal =() => {
  MicroModal.show('note-editor-modal');
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

const removeNoteItem = noteElement => {
  const parentNoteItem = noteElement.closest('.note-list__item');
  const id = parentNoteItem.dataset.id;
  notepad.deleteNote(id);
  parentNoteItem.remove();
  notyf.success('Заметка успешно удалена')
};

const renderNoteItems = (listRef, notes) => {
  const markup = createNoteItemMarkup(notes);
listRef.innerHTML = '';
refs.noteList.insertAdjacentHTML('beforeend', markup)
};

const markup = createNoteItemMarkup(initialNotes);

refs.noteList.insertAdjacentHTML('beforeend', markup);
refs.editor.addEventListener('submit', handleEditorSubmit);
refs.search.addEventListener('input', handleFilterChange);
refs.noteList.addEventListener('click', handleListClick);
refs.openModalBtn.addEventListener('click', handleModal);
