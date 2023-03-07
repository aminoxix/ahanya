// import { timestamp } from "./scripts/timestamp";

// date
const d = new Date();

let monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDate() {
  return monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}
const hours = d.getHours();
var ampm = hours <= 11 ? "AM" : "PM";
const getHours = () => {
  if (hours > 12) return hours - 12;
  else return hours;
};

let minutes = d.getMinutes();
const getMinutes = () => {
  if (minutes < 10) return `0${+minutes}`;
  else return minutes;
};

let seconds = d.getSeconds();
const getSeconds = () => {
  if (seconds < 10) return `0${+seconds}`;
  else return seconds;
};

const timestamp =
  getDate() +
  " | " +
  getHours() +
  ":" +
  getMinutes() +
  ":" +
  getSeconds() +
  " " +
  ampm;

// tab

const welcomeContent = document.getElementById("welcome-content");
const notesContent = document.getElementById("notes-content");
const bookmarksContent = document.getElementById("bookmarks-content");
const todosContent = document.getElementById("todos-content");

document
  .querySelector("[data-welcome]")
  .addEventListener("click", (event) => openTab(event, welcomeContent));
document
  .querySelector("[data-notes]")
  .addEventListener("click", (event) => openTab(event, notesContent));
document
  .querySelector("[data-bookmarks]")
  .addEventListener("click", (event) => openTab(event, bookmarksContent));
document
  .querySelector("[data-todos]")
  .addEventListener("click", (event) => openTab(event, todosContent));

document.getElementById("defaultOpen").click();

function openTab(ev, tab) {
  // Get all elements with class="tab-content" and hide them
  const tabContent = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  // Get all elements with class="tab-links" and remove the class "active"
  const tabLinks = document.getElementsByClassName("tab-links");
  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" active", "");
  }
  // Show the current tab, and add an "active" class to the button that opened the tab
  tab.style.display = "block";
  ev.currentTarget.className += " active";
}

// notes

const saveNotes = document.getElementById("save-notes");
const note = document.getElementById("note");
const notesList = document.getElementById("notes-list");

const notesArray = JSON.parse(localStorage.getItem("notes")) || [
  {
    id: 1,
    message: `It's not a bug; it's an undocumented feature.`,
    color: "#00FF00",
  },
  {
    id: 2,
    message: `while(!(succeed = try()));`,
    color: "#DF00A9",
  },
  {
    id: 3,
    message: `Software is like sex: it's better when its free. - L.T.`,
    color: "#66FFFF",
  },
  {
    id: 4,
    message: `< / > Keep Calm & Keep Coding`,
    color: "#feff9c",
  },
];

saveNotes.addEventListener("click", () => {
  notesArray.unshift({
    id: generateRandomId(),
    message: note.value,
    color: generateRandomColor(),
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

function renderNotes() {
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

function generateRandomId() {
  return Math.random().toString().slice(2);
}

const colors = [
  "#ff7eb9",
  "#ff65a3",
  "#dfff00",
  "#7afcff",
  "#feff9c",
  "#fff740",
];

const generateRandomColor = () =>
  colors[Math.floor(Math.random() * colors.length)];

// bookmarks

const bookmarksList = document.getElementById("bookmarks-list");
const bookmarkForm = document.getElementById("bookmark-form");
const bookmarkLink = document.getElementById("bookmark-link");
const bookmarkPurpose = document.getElementById("bookmark-purpose");
const bookmarkURL = document.getElementById("get-current-url");

const bookmarksArray = JSON.parse(localStorage.getItem("bookmarks")) || [
  {
    id: 1,
    link: "https://www.aminoxix.me",
    purpose: "Creator 1 Portfolio",
    time: timestamp,
  },
  {
    id: 2,
    link: "https://curios.vercel.app",
    purpose: "Creator 2 Portfolio",
    time: timestamp,
  },
];

function editBookmarkPurpose(ev, id) {
  for (let i = 0; i < bookmarksArray.length; i++) {
    if (bookmarksArray[i].id == id) {
      let newBookmarkPurpose = prompt(
        "Enter the latest purpose here..",
        bookmarksArray[i].purpose
      );
      if (newBookmarkPurpose != null) {
        bookmarksArray[i].purpose = newBookmarkPurpose;
      }
    }
  }
  renderForm();
}

function removeBookmark(ev, id) {
  for (let i = 0; i < bookmarksArray.length; i++) {
    if (bookmarksArray[i].id == id) {
      bookmarksArray.splice(i, 1);
    }
  }
  renderForm();
}

function renderForm() {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarksArray));

  bookmarksList.innerHTML = "";
  bookmarkLink.value = "";
  bookmarkPurpose.value = "";

  bookmarksArray.map((bookmark) => {
    bookmarksList.innerHTML += `
      <div id="bookmark-paper">
        <div class="corner">
          <div class="triangle"></div>
        </div>
        <div class="bookmark-cross" data-remove>✖</div>
        <div id="bookmark-pattern">
          <div id="bookmark-text">
            <div>${bookmark.time}</div>
            <br />
            <a href="${bookmark.link}">
              ${bookmark.link}
            </a>
            <br />
            <br />
            ${bookmark.purpose}
              <i class="fa-solid fa-pen-to-square" data-edit></i>
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    `;
  });

  const removeBookmarkBtns = document.querySelectorAll("[data-remove]");
  for (let i = 0; i < removeBookmarkBtns.length; i++) {
    removeBookmarkBtns[i].addEventListener("click", (e) =>
      removeBookmark(e, bookmarksArray[i].id)
    );
  }

  const editBookmarkBtns = document.querySelectorAll("[data-edit]");
  for (let i = 0; i < editBookmarkBtns.length; i++) {
    editBookmarkBtns[i].addEventListener("click", (e) =>
      editBookmarkPurpose(e, bookmarksArray[i].id)
    );
  }
}

bookmarkForm.addEventListener("click", (e) => {
  if (e != null) {
    if (bookmarkLink.value) {
      bookmarksArray.unshift({
        time: timestamp,
        id: generateRandomId(),
        link: bookmarkLink.value,
        purpose:
          bookmarkPurpose.value ||
          "write your purpose of bookmark this url here..",
      });
    } else return e.preventDefault();
  }

  e.preventDefault();
  renderForm();
});

bookmarkURL.addEventListener("click", (e) => {
  if (
    window.location.href == "http://127.0.0.1:5500/" ||
    "http://localhost:5500/" ||
    "https://devstrons.github.io/ahanya" ||
    "http://devstrons.github.io/ahanya"
  ) {
    bookmarksArray.unshift({
      time: timestamp,
      id: generateRandomId(),
      link: window.location.href,
      purpose:
        prompt("Define your purpose to bookmarking URL..") ||
        "write your purpose of bookmark this url here..",
    });
    renderForm();
  } else {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      bookmarksArray.unshift({
        time: timestamp,
        id: generateRandomId(),
        link: tabs[0].url,
        purpose:
          prompt("Define your purpose to bookmarking URL..") ||
          "write your purpose of bookmark this url here..",
      });
      renderForm();
    });
  }
});

// render form
renderForm();
