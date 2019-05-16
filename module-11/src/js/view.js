import noteTemplate from '../templates/note.hbs';
export const getRefs = () => ({
  noteList: document.querySelector('.note-list'),
  editor: document.querySelector('.note-editor'),
  editorInput: document.querySelector('.note-editor__input'),
  search: document.querySelector('.search-form__input'),
  openModalBtn: document.querySelector('.page-header__button')
});

export const createNoteItemMarkup = initialNotes => {
  const markup = initialNotes.map( noteItem => noteTemplate(noteItem)).join('');
  return markup;
};

const createNoteItem = noteItem => {
  return noteTemplate(noteItem);
};

export const addItemToList = (listRef, note) => {
  const noteItem = createNoteItem(note);
  listRef.insertAdjacentHTML('beforeend', noteItem);
};
