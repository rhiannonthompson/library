// THE CARD

const bookGrid = document.querySelector("#book-grid");

const createCardImage = () => {
  const imageContainer = document.createElement("div");
  imageContainer.className = "card-img";
  const img = document.createElement("img");
  img.src = "images/books.jpg";
  imageContainer.append(img);

  return imageContainer;
};

const createCardInfo = (title, author, pages) => {
  const bookInfoContainer = document.createElement("div");
  bookInfoContainer.className = "book-info";
  const bookMetaData = [
    { heading: title, cssClass: "book-title" },
    { heading: author, cssClass: "author" },
    { heading: pages, cssClass: "pages" },
  ];

  for (let bookMetaDataItem of bookMetaData) {
    let newMetaItem = document.createElement("p");
    newMetaItem.textContent = bookMetaDataItem.heading;
    newMetaItem.className = bookMetaDataItem.cssClass;

    bookInfoContainer.appendChild(newMetaItem);
  }

  return bookInfoContainer;
};

const createCardButtons = () => {
  const bookStatus = document.createElement("div");
  bookStatus.className = "book-status";

  let cardButtons = [
    {
      iconClass: "fas fa-book",
      tooltipText: "Already read",
    },
    {
      iconClass: "fas fa-book-reader",
      tooltipText: "Reading now",
    },
    {
      iconClass: "fas fa-heart",
      tooltipText: "Mark favorite",
    },
    {
      iconClass: "fas fa-trash-alt",
      tooltipText: "Remove book",
    },
  ];

  for (let cardButton of cardButtons) {
    let tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    bookStatus.appendChild(tooltip);

    let button = document.createElement("button");
    button.className = "btn favorite";
    tooltip.appendChild(button);

    let buttonIcon = document.createElement("i");
    buttonIcon.className = cardButton.iconClass;
    button.appendChild(buttonIcon);

    let tooltipBox = document.createElement("div");
    tooltipBox.className = "tooltipbox";
    tooltip.appendChild(tooltipBox);

    let toolText = document.createElement("p");
    toolText.textContent = cardButton.tooltipText;
    tooltipBox.appendChild(toolText);
  }

  return bookStatus;
};

const createCard = (book) => {
  // creates new card
  const card = document.createElement("div");
  card.className = "card card-into-container";

  // prevents error when user input is blank
  // TODO: Create an error message for the user
  try {
    card.append(createCardImage());
    card.append(
      createCardInfo(book.title, `by ${book.author}`, `${book.pages} pages`)
    );
    card.append(createCardButtons());
  } catch (error) {
    if (error instanceof TypeError) {
      return;
    }
  }

  return card;
};

// THE LIBRARY

const LIBRARY = {
  KEY: "Library",
  contents: [],

  init() {
    let libraryContents = localStorage.getItem(LIBRARY.KEY);
    if (libraryContents) {
      LIBRARY.contents = JSON.parse(libraryContents);
      for (let content of LIBRARY.contents) {
        bookGrid.appendChild(createCard(content));
      }
    } else {
      LIBRARY.contents = [];
      LIBRARY.sync();
    }
    console.log(this.contents);
  },
  sync() {
    let libraryContents = JSON.stringify(LIBRARY.contents);
    localStorage.setItem(LIBRARY.KEY, libraryContents);
  },

  // TODO: Check if book is already in library
  find(id) {
    let match = this.contents.filter((items) => {
      if (items.id == id) {
        return true;
      }
    });
    if (match && match[0]) {
      return match[0];
    }
  },

  add(id) {
    if (this.find(id)) {
      alert("This book is already in your library");
    } else {
      let book = userBookInput();
      LIBRARY.contents.push(book);
      LIBRARY.sync();
    }
  },

  refine(value) {
    return this.contents.filter((item) => item[value]);
  },
};

LIBRARY.init();

// User input

class Book {
  constructor(
    id,
    title,
    author,
    pages,
    read,
    favorite,
    reading_now,
    want_to_read
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.favorite = favorite;
    this.reading_now = reading_now;
    this.wantToRead = want_to_read;
  }
}

const isEmptyString = (string) => {
  return !string || string.length === 0 || string.trim() === "";
};

const isEmpty = (number) => {
  return isNaN(number);
};

const userInputBook = () => {
  const inputTitle = document.querySelector("#title").value;
  const inputAuthor = document.querySelector("#author").value;
  let inputPages = document.querySelector("#pages").value;
  let inputRead = document.querySelector("input[name='read']:checked").value;

  inputPages = parseInt(inputPages);
  if (inputRead === "true") {
    inputRead = true;
  } else {
    inputRead = false;
  }

  switch (true) {
    case isEmptyString(inputTitle):
      alert("Please enter a title");
      break;
    case isEmptyString(inputAuthor):
      alert("Please enter an author");
      break;
    case isEmpty(inputPages):
      alert("Please enter the number of pages");
      break;
    default:
      book = new Book(
        Date.now(),
        inputTitle,
        inputAuthor,
        inputPages,
        inputRead,
        false,
        false
      );

      return book;
  }
};

// Add book to library

const addBookToLibrary = (event) => {
  event.preventDefault();

  let book = userInputBook();

  if (!book) {
    return;
  } else {
    LIBRARY.contents.push(book);
    LIBRARY.sync();
    document.querySelector("form").reset();
    // Prevents errors when no user input is blank
    try {
      bookGrid.appendChild(createCard(book));
    } catch (error) {
      if (error instanceof TypeError) {
        return;
      }
    }
    closeForm(event);

    // TODO Create popup for alert
    alert(book.title + " was added to your library");
  }
};

// Clear all books from the display

const clearDisplay = () => {
  while (bookGrid.lastChild.id !== "new-book") {
    bookGrid.removeChild(bookGrid.lastChild);
  }
};

// Open form

const openForm = () => {
  siteOverlay.style.visibility = "visible";
  formPopup.style.display = "flex";
  siteOverlay.style.zIndex = "2";
};

// Close form

const closeForm = (event) => {
  event.preventDefault();
  siteOverlay.style.zIndex = "-1";
  siteOverlay.style.visibility = "hidden";
  formPopup.style.display = "none";
};

// Selectors for the form

const submitForm = document.querySelector(".add-book-btn");
const openNewBookForm = document.querySelector(".add-new-book");
const closeNewBookForm = document.querySelector(".close-form-btn");
const formPopup = document.querySelector(".form-popup");
const siteOverlay = document.querySelector(".site-overlay");

// Event listners

submitForm.addEventListener("click", addBookToLibrary);

openNewBookForm.addEventListener("click", openForm);

closeNewBookForm.addEventListener("click", closeForm);

// THE SIDEBAR

const allBooks = document.querySelector("#all-book");
const readingNow = document.querySelector("#now-book");
const wantToRead = document.querySelector("#want-book");
const alreadyRead = document.querySelector("#already-book");
const myFavorites = document.querySelector("#fav-book");
const libraryHeading = document.querySelector(".library-heading");
const allSidebarButtons = document.querySelectorAll(".book-data li");

const changeBackgroundColor = (button) => {
  button.style.backgroundColor = "var(--color-orange)";
  allSidebarButtons.forEach((item) => {
    if (item != button) {
      item.style.removeProperty("background-color");
    }
  });
};

const updateLibraryHeading = (heading) => {
  libraryHeading.textContent = heading;
};

const refineDisplay = (value) => {
  let refinedLibrary = LIBRARY.refine(value);
  console.log(refinedLibrary);
  for (let book of refinedLibrary) {
    bookGrid.appendChild(createCard(book));
  }
};

const addEventListenerToButton = (button, value) => {
  button.addEventListener("click", () => {
    changeBackgroundColor(button);
    updateLibraryHeading(button.textContent);
    clearDisplay();
    if(!value) {
      LIBRARY.init();
    } else {
    refineDisplay(value);
    }
  });
};

addEventListenerToButton(allBooks);
addEventListenerToButton(readingNow, "reading_now");
addEventListenerToButton(wantToRead, "want_to_read");
addEventListenerToButton(alreadyRead, "read");
addEventListenerToButton(myFavorites, "favorite");
