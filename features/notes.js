import {
  generateRandomId,
  generateRandomColorForNotes,
} from "../utils/general.js";

const saveNotes = document.getElementById("save-notes");
const note = document.getElementById("note");
// const notesList = document.getElementById("notes-list");

const notesArray = JSON.parse(localStorage.getItem("notes")) || [
  {
    id: 1,
    message: `It's not a bug; it's an undocumented feature.`,
    color: "#E4ACCE",
  },
  {
    id: 2,
    message: `while(!(succeed = try()));`,
    color: "#5B88C4",
  },
  {
    id: 3,
    message: `Software is like sex: it's better when its free. - L.T.`,
    color: "#73CABF",
  },
  {
    id: 4,
    message: `< / > Keep Calm & Keep Coding`,
    color: "#FAD491",
  },
];

saveNotes.addEventListener("click", () => {
  notesArray.unshift({
    id: generateRandomId(),
    message: note.value,
    color: generateRandomColorForNotes(),
  });
  renderNotes();
});

function deleteNotes(id) {
  for (let i = 0; i < notesArray.length; i++) {
    if (notesArray[i].id == id) {
      notesArray.splice(i, 1);
    }
  }
  renderNotes();
}

export function renderNotes() {
  localStorage.setItem("notes", JSON.stringify(notesArray));
  note.value = "";

  let [choresList] = document.getElementsByClassName("notes-list");
  choresList.innerHTML = "";

  for (let chore of notesArray) {
    const noteCard = document.createElement("li");
    noteCard.className = "note-card flex-row justify-center";
    noteCard.style.backgroundColor = chore.color;
    noteCard.innerHTML = `<p class="note-text">${chore.message}</p>`;

    const pin = document.createElement("div");
    pin.className = "pin";
    pin.innerHTML = `
      <div class="pin">
        <div class="metal"></div>
        <div class="bottom-circle"></div>
      </div>
    `;
    pin.addEventListener("click", (e) => deleteNotes(chore.id));

    choresList.append(noteCard);
    noteCard.append(pin);
  }
}

// render notes
renderNotes();
