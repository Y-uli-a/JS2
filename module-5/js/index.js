"use strict";

// Конструктор Notepad при инициализации принимает массив заметок
const Notepad = function Notepad(notes = []) {
  (this.getNotes = function() {
    return notes;
  }),
    (this.findNoteById = function(id) {
      for (const note of notes) {
        if (note.id === id) return note;
      }
    }),
    (this.saveNote = function(note) {
      notes.push(note);
    }),
    (this.deleteNote = function(id) {
      for (let i = 0; i < notes.length; i += 1) {
        const note = notes[i];
        if (note.id === id) {
          notes.splice(i, 1);
          return;
        }
      }
    }),
    (this.updateNoteContent = function(id, { field, value }) {
      const note = this.findNoteById(id);
      if (!note) return;
      note[field] = value;
    }),
    (this.updateNotePriority = function(id, priority) {
      const note = this.findNoteById(id);
      if (!note) return;
      note.priority = priority;
    }),
    (this.filterNotesByQuery = function(query = "") {
      const foundNotes = [];

      for (const note of notes) {
        const noteContent = `${note.body} ${note.title}`;

        const notePresent = noteContent
          .toLowerCase()
          .includes(query.toLowerCase());
        if (notePresent) {
          foundNotes.push(note);
        }
      }
      return foundNotes;
    }),
    (this.filterNotesByPriority = function(priority) {
      const notesFiltered = [];
      for (const note of notes) {
        if (note.priority === priority) {
          notesFiltered.push(note);
        }
      }
      return notesFiltered;
    });
};

/*
  Добавляем статическое свойство, в котором храним карту приоритетов.
  Каждый приоритет состоит из:
    id - идентификатора, который совпадает со значением свойств объекта PRIORITY_TYPES
    value - значение приоритета
    name - строковое имя приоритета
*/
const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2
};

Notepad.PRIORITIES = {
  0: { id: 0, value: 0, name: "Low" },
  1: { id: 1, value: 1, name: "Normal" },
  2: { id: 2, value: 2, name: "High" }
};
// Добавьте статический метод Notepad.getPriorityName(priorityId), который получает идентификатор приоритета и возвращает значение поля name из карты приоритетов.

Notepad.getPriorityName = function getPriorityName(priorityId) {
  return Notepad.PRIORITIES[priorityId].name;
};

const initialNotes = [
  {
    id: 1,
    title: "JavaScript essentials",
    body:
      "Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc",
    priority: PRIORITY_TYPES.HIGH
  },
  {
    id: 2,
    title: "Refresh HTML and CSS",
    body:
      "Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.",
    priority: PRIORITY_TYPES.NORMAL
  }
];

/*
 * Посмотрим имя приоритета по id
 */
console.log(Notepad.getPriorityName(PRIORITY_TYPES.LOW)); // "Low"
console.log(Notepad.getPriorityName(PRIORITY_TYPES.NORMAL)); // "Normal"
console.log(Notepad.getPriorityName(PRIORITY_TYPES.HIGH)); // "High"

const notepad = new Notepad(initialNotes);

/*
  Смотрю что у меня в заметках после инициализации
*/
console.log("Все текущие заметки: ", notepad.getNotes());

/*
 * Добавляю еще 2 заметки и смотрю что получилось
 */
notepad.saveNote({
  id: 3,
  title: "Get comfy with Frontend frameworks",
  body:
    "First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.",
  priority: PRIORITY_TYPES.NORMAL
});

notepad.saveNote({
  id: 4,
  title: "Winter clothes",
  body:
    "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
  priority: PRIORITY_TYPES.LOW
});

console.log("Все текущие заметки: ", notepad.getNotes());

/*
 *  Зима уже близко, пора поднять приоритет на покупку одежды
 */
notepad.updateNotePriority(4, PRIORITY_TYPES.NORMAL);
console.log(
  "Заметки после обновления приоритета для id 4: ",
  notepad.getNotes()
);

/*
 * Решил что фреймворки отложу немного, понижаю приоритет
 */
notepad.updateNotePriority(3, PRIORITY_TYPES.LOW);
console.log(
  "Заметки после обновления приоритета для id 3: ",
  notepad.getNotes()
);

/*
 * Решил отфильтровать заметки по слову html
 */
console.log(
  'Отфильтровали заметки по ключевому слову "html": ',
  notepad.filterNotesByQuery("html")
);

/*
 * Решил отфильтровать заметки по слову javascript
 */
console.log(
  'Отфильтровали заметки по ключевому слову "javascript": ',
  notepad.filterNotesByQuery("javascript")
);

/*
 * Хочу посмотреть только заметки с нормальным приоритетом
 */
console.log(
  "Отфильтровали заметки по нормальному приоритету: ",
  notepad.filterNotesByPriority(PRIORITY_TYPES.NORMAL)
);

/*
 * Обновим контент заметки с id 3
 */
notepad.updateNoteContent(3, {
  field: "title",
  value: "Get comfy with React.js or Vue.js"
});
console.log(
  "Заметки после обновления контента заметки с id 3: ",
  notepad.getNotes()
);

/*
 * Повторил HTML и CSS, удаляю запись c id 2
 */
notepad.deleteNote(2);
console.log("Заметки после удаления с id 2: ", notepad.getNotes());
