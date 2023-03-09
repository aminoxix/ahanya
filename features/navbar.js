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
