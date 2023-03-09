import {
  generateRandomId,
  generateRandomColorForBookmarks,
} from "../utils/general.js";
import { timestamp } from "../utils/timestamp.js";

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
    color: "#E55089",
  },
  {
    id: 2,
    link: "https://curios.vercel.app",
    purpose: "Creator 2 Portfolio",
    time: timestamp,
    color: "#E4CEAF",
  },
  {
    id: 3,
    link: "https://devstrons.org",
    purpose: "devstrons official website",
    time: timestamp,
    color: "#6FB8D3",
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

export function renderForm() {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarksArray));

  bookmarksList.innerHTML = "";
  bookmarkLink.value = "";
  bookmarkPurpose.value = "";

  bookmarksArray.map((bookmark) => {
    bookmarksList.innerHTML += `
      <div id="bookmark-paper" bookmark-paper>
        <div class="corner">
          <div class="triangle"></div>
        </div>
        <div class="bookmark-cross" data-remove>✖</div>
        <div id="bookmark-pattern">
          <div id="bookmark-text">
            <div class="flex-column justify-center date-time-gap">
              <p class="date-time-title">Created at:</p>
              <div class="date-time" date-time>${bookmark.time}</div>
            </div>
            <br />
            <a class="bookmark-link" href="${bookmark.link}">
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

  const bookmarkPaper = document.querySelectorAll("[bookmark-paper]");
  const dateTime = document.querySelectorAll("[date-time]");
  for (let i = 0; i < bookmarksArray.length; i++) {
    bookmarkPaper[i].style.backgroundColor = bookmarksArray[i].color;
    dateTime[i].style.backgroundColor = bookmarksArray[i].color;
  }

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
        color: generateRandomColorForBookmarks(),
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
      color: generateRandomColorForBookmarks(),
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
        color: generateRandomColorForBookmarks(),
      });
      renderForm();
    });
  }
});

// render form
renderForm();
