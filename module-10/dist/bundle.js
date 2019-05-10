!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=11)}([function(t,e,n){"use strict";var r,o,a,i=n(4),s="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";function c(){a=!1}function u(t){if(t){if(t!==r){if(t.length!==s.length)throw new Error("Custom alphabet for shortid must be "+s.length+" unique characters. You submitted "+t.length+" characters: "+t);var e=t.split("").filter(function(t,e,n){return e!==n.lastIndexOf(t)});if(e.length)throw new Error("Custom alphabet for shortid must be "+s.length+" unique characters. These characters were not unique: "+e.join(", "));r=t,c()}}else r!==s&&(r=s,c())}function l(){return a||(a=function(){r||u(s);for(var t,e=r.split(""),n=[],o=i.nextValue();e.length>0;)o=i.nextValue(),t=Math.floor(o*e.length),n.push(e.splice(t,1)[0]);return n.join("")}())}t.exports={get:function(){return r||s},characters:function(t){return u(t),r},seed:function(t){i.seed(t),o!==t&&(c(),o=t)},lookup:function(t){return l()[t]},shuffled:l}},function(t,e,n){},function(t,e,n){"use strict";t.exports=n(3)},function(t,e,n){"use strict";var r=n(0),o=n(5),a=n(9),i=n(10)||0;function s(){return o(i)}t.exports=s,t.exports.generate=s,t.exports.seed=function(e){return r.seed(e),t.exports},t.exports.worker=function(e){return i=e,t.exports},t.exports.characters=function(t){return void 0!==t&&r.characters(t),r.shuffled()},t.exports.isValid=a},function(t,e,n){"use strict";var r=1;t.exports={nextValue:function(){return(r=(9301*r+49297)%233280)/233280},seed:function(t){r=t}}},function(t,e,n){"use strict";var r,o,a=n(6),i=(n(0),1459707606518),s=6;t.exports=function(t){var e="",n=Math.floor(.001*(Date.now()-i));return n===o?r++:(r=0,o=n),e+=a(s),e+=a(t),r>0&&(e+=a(r)),e+=a(n)}},function(t,e,n){"use strict";var r=n(0),o=n(7),a=n(8);t.exports=function(t){for(var e,n=0,i="";!e;)i+=a(o,r.get(),1),e=t<Math.pow(16,n+1),n++;return i}},function(t,e,n){"use strict";var r,o="object"==typeof window&&(window.crypto||window.msCrypto);r=o&&o.getRandomValues?function(t){return o.getRandomValues(new Uint8Array(t))}:function(t){for(var e=[],n=0;n<t;n++)e.push(Math.floor(256*Math.random()));return e},t.exports=r},function(t,e){t.exports=function(t,e,n){for(var r=(2<<Math.log(e.length-1)/Math.LN2)-1,o=Math.ceil(1.6*r*n/e.length),a="";;)for(var i=t(o),s=0;s<o;s++){var c=i[s]&r;if(e[c]&&(a+=e[c]).length===n)return a}}},function(t,e,n){"use strict";var r=n(0);t.exports=function(t){return!(!t||"string"!=typeof t||t.length<6||new RegExp("[^"+r.get().replace(/[|\\{}()[\]^$+*?.-]/g,"\\$&")+"]").test(t))}},function(t,e,n){"use strict";t.exports=0},function(t,e,n){"use strict";n.r(e);n(1);var r=0,o=1,a=2,i="delete-note",s="edit-note",c="increase-priority",u="decrease-priority";function l(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var d=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._notes=e}var e,r,o;return e=t,o=[{key:"generateUniqueId",value:function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)}},{key:"getPriorityName",value:function(e){return t.PRIORITIES[e].name}}],(r=[{key:"findNoteById",value:function(t){var e=!0,n=!1,r=void 0;try{for(var o,a=this._notes[Symbol.iterator]();!(e=(o=a.next()).done);e=!0){var i=o.value;if(i.id===t)return i}}catch(t){n=!0,r=t}finally{try{e||null==a.return||a.return()}finally{if(n)throw r}}}},{key:"saveNote",value:function(t,e){var r={id:n(2).generate(),title:t,body:e,priority:0};return this._notes.push(r),console.log(r),r}},{key:"deleteNote",value:function(t){this._notes=this._notes.filter(function(e){return e.id!==t}),console.log(this._notes)}},{key:"updateNoteContent",value:function(t,e){var n=e.field,r=e.value,o=this.findNoteById(t);o&&(o[n]=r)}},{key:"updateNotePriority",value:function(t,e){var n=this.findNoteById(t);n&&(n.priority=e)}},{key:"filterNotesByQuery",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=[],n=!0,r=!1,o=void 0;try{for(var a,i=this._notes[Symbol.iterator]();!(n=(a=i.next()).done);n=!0){var s=a.value;"".concat(s.body," ").concat(s.title).toLowerCase().includes(t.toLowerCase())&&e.push(s)}}catch(t){r=!0,o=t}finally{try{n||null==i.return||i.return()}finally{if(r)throw o}}return e}},{key:"filterNotesByPriority",value:function(t){var e=[],n=!0,r=!1,o=void 0;try{for(var a,i=this._notes[Symbol.iterator]();!(n=(a=i.next()).done);n=!0){var s=a.value;s.priority===t&&e.push(s)}}catch(t){r=!0,o=t}finally{try{n||null==i.return||i.return()}finally{if(r)throw o}}return e}},{key:"notes",get:function(){return this._notes}}])&&l(e.prototype,r),o&&l(e,o),t}();d.PRIORITIES={0:{id:0,value:0,name:"Low"},1:{id:1,value:1,name:"Normal"},2:{id:2,value:2,name:"High"}};var f=[{id:"id-1",title:"JavaScript essentials",body:"Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc",priority:a},{id:"id-2",title:"Refresh HTML and CSS",body:"Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.",priority:o},{id:"id-3",title:"Get comfy with Frontend frameworks",body:"First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.",priority:o},{id:"id-4",title:"Winter clothes",body:"Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",priority:r}];function p(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var v=function(t){var e=t.id,n=t.title,r=t.body,o=t.priority,a=y({title:n,body:r}),i=h(o),s=document.createElement("li");s.classList.add("note-list__item"),s.dataset.id=e;var c=document.createElement("div");return c.classList.add("note"),c.append(a,i),s.append(c),s},y=function(t){var e=t.title,n=t.body,r=document.createElement("div");r.classList.add("note__content");var o=document.createElement("h2");o.classList.add("note__title"),o.textContent=e;var a=document.createElement("p");return a.classList.add("note__body"),a.textContent=n,r.append(o,a),r},h=function(t){var e=document.createElement("footer");e.classList.add("note__footer");var n=document.createElement("section");n.classList.add("note__section");var r=document.createElement("button");r.classList.add("action"),r.dataset.action=u;var o=document.createElement("i");o.classList.add("material-icons","action__icon"),o.textContent="expand_less";var a=document.createElement("button");a.classList.add("action"),a.dataset.action=c;var l=document.createElement("i");l.classList.add("material-icons","action__icon"),l.textContent="expand_more";var f=document.createElement("span");f.classList.add("note__priority"),f.textContent=d.getPriorityName(t);var p=document.createElement("section");p.classList.add("note__section");var v=document.createElement("button");v.classList.add("action"),v.dataset.action=s;var y=document.createElement("i");y.classList.add("material-icons","action__icon"),y.textContent="edit";var h=document.createElement("button");h.classList.add("action"),h.dataset.action=i;var m=document.createElement("i");return m.classList.add("material-icons","action__icon"),m.textContent="delete",r.appendChild(o),a.appendChild(l),n.append(r,a,f),v.appendChild(y),h.appendChild(m),p.append(v,h),e.append(n,p),e},m=function(t,e){var n=e.map(function(t){return v(t)});t.innerHTML="",t.append.apply(t,p(n))};function g(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],r=!0,o=!1,a=void 0;try{for(var i,s=t[Symbol.iterator]();!(r=(i=s.next()).done)&&(n.push(i.value),!e||n.length!==e);r=!0);}catch(t){o=!0,a=t}finally{try{r||null==s.return||s.return()}finally{if(o)throw a}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var b=new d(f),w={noteList:document.querySelector(".note-list"),editor:document.querySelector(".note-editor"),editorInput:document.querySelector(".note-editor__input"),search:document.querySelector(".search-form__input")};m(w.noteList,f),w.editor.addEventListener("submit",function(t){t.preventDefault();var e=g(t.currentTarget.elements,2),n=e[0],r=e[1],o=n.value.trim(),a=r.value.trim();if(""===a||""===o)return alert("Необходимо заполнить все поля!");var i,s,c=b.saveNote(o,a);i=w.noteList,s=v(c),i.appendChild(s),t.currentTarget.reset()}),w.search.addEventListener("input",function(t){console.log(t.target.value);var e=b.filterNotesByQuery(t.target.value);console.table(e),m(w.noteList,e)}),w.noteList.addEventListener("click",function(t){var e=t.target;if("I"===e.nodeName)switch(e.closest("button").dataset.action){case i:!function(t){var e=t.closest(".note-list__item");console.log(e);var n=e.dataset.id;b.deleteNote(n),e.remove()}(e);break;default:console.log("invalid action!")}})}]);
//# sourceMappingURL=bundle.js.map