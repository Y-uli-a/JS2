import './sass/main.scss';
import {NOTE_ACTIONS} from './js/utils/constants';
import Notepad from './js/notepad-model';
import initialNotes from './js/initialNotes';
import {getRefs, renderNoteItems, addItemToList} from './js/view';


const notepad = new Notepad(initialNotes);

const refs = getRefs();

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
