// THE CARD

const bookGrid = document.querySelector("#book-grid");

const READ = {
  name : "read",
  color : "rgb(43, 83, 17)"
};

const READING = {
  name : "reading",
  color : "rgb(23, 66, 114)"
};

const FAVORITE = {
  name : "favorite",
  color : "rgb(106, 63, 114)"
}

const REMOVE = "remove";

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
    { 
      heading: title, 
      cssClass: "book-title" 
    },
    { 
      heading: author, 
      cssClass: "author" 
    },
    { 
      heading: pages, 
      cssClass: "pages" 
    },
  ];

  for (let bookMetaDataItem of bookMetaData) {
    let newMetaItem = document.createElement("p");
    newMetaItem.textContent = bookMetaDataItem.heading;
    newMetaItem.className = bookMetaDataItem.cssClass;

    bookInfoContainer.appendChild(newMetaItem);
  }

  return bookInfoContainer;
};

const createCardButtons = (isRead, isReading, isFavorite, bookId) => {
  const bookStatus = document.createElement("div");
  bookStatus.className = "book-status";

  let cardButtons = [
    {
      name: "read",
      iconClass: "fas fa-book",
      tooltipText: "Add to Read Books",
    },
    {
      name: "reading",
      iconClass: "fas fa-book-reader",
      tooltipText: "Add to Reading Now",
    },
    {
      name: "favorite",
      iconClass: "fas fa-heart",
      tooltipText: "Add to My Favorites",
    },
    {
      name: "remove",
      iconClass: "fas fa-trash-alt",
      tooltipText: "Remove from My Library",
    },
  ];

  for (let cardButton of cardButtons) {
    let tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    bookStatus.appendChild(tooltip);

    let button = document.createElement("button");
    button.className = "btn";
    tooltip.appendChild(button);

    let buttonIcon = document.createElement("i");
    buttonIcon.className = cardButton.iconClass;
    buttonIcon.setAttribute("name", cardButton.name);
    buttonIcon.setAttribute("data-id", bookId);
    button.addEventListener("click", changeButtonState);
    button.addEventListener("click", () => {
      buttonIcon.style.color = changeIconColor(cardButton.name);
    });
    button.appendChild(buttonIcon);

    // Assigns color to icon buttons
    if (cardButton.name === READ.name && isRead) {
      buttonIcon.style.color = changeIconColor(cardButton.name);
    } else if (cardButton.name === READING.name && isReading) {
      button.style.color = changeIconColor(cardButton.name);
    } else if (cardButton.name === FAVORITE.name && isFavorite) {
      button.style.color = changeIconColor(cardButton.name);
    }

    let tooltipBox = document.createElement("div");
    tooltipBox.className = "tooltipbox";
    tooltip.appendChild(tooltipBox);
    let toolText = document.createElement("p");
    toolText.textContent = cardButton.tooltipText;
    tooltipBox.appendChild(toolText);
  }

  return bookStatus;
};

function changeIconColor(name) {
  let color;
  if (name === READ.name) {
    color = READ.color;
  } else if (name === READING.name) {
    color = READING.color;
  } else if (name === FAVORITE.name) {
    color = FAVORITE.color;
  } else {
    return;
  }
  return color;
}

// changes state of card buttons

function changeButtonState(event) {
  event.preventDefault();
  let id = parseInt(event.target.getAttribute("data-id"));
  let name = event.target.getAttribute("name");
  LIBRARY.changeState(id, name);

  if (name === "remove") {
    alertUser(id, name);
    LIBRARY.remove(id);
    clearLibrary();
    resetLibraryToAllBooks();
    showLibray();
    // TODO: Create better alert
  } else {
    // TODO: Create better alert
    alertUser(id, name);
  }
}

function alertUser(id, name) {
  let title;
  for(let item of LIBRARY.contents) {
    if(item.id === id)
    title = item.title;
  } 
  if (name === READ.name) {
    alert(`You have added ${title} to ${readBooks.textContent}`);
  } else if (name === READING.name) {
    alert(`You have added ${title} to ${readingNow.textContent}`);
  } else if (name === FAVORITE.name) {
    alert(`You have added ${title} to ${myFavorites.textContent}`);
  } else if (name === REMOVE) {
    alert(`You have removed ${title} from the library`);
  }
}

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
    card.append(
      createCardButtons(book.read, book.reading, book.favorite, book.id)
    );
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
    let libraryContents = localStorage.getItem(this.KEY);
    if (libraryContents) {
      this.contents = JSON.parse(libraryContents);
    } else {
      this.contents = [];
      this.sync();
    }
  },
  sync() {
    let libraryContents = JSON.stringify(this.contents);
    localStorage.setItem(this.KEY, libraryContents);
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

  //  TODO: Disallow dublicate entries

  add(id) {
    if (this.find(id)) {
      alert("This book is already in your library");
    } else {
      let book = userBookInput();
      LIBRARY.contents.push(book);
      LIBRARY.sync();
    }
  },

  refine(key, value) {
    return this.contents.filter((item) => item[key] === value);
  },

  changeState(id, name) {
    if (this.find(id)) {
      for (let content of this.contents) {
        if (content.id === id) {
          if (name === READ.name) {
            content.read = true;
          } else if (name === READING.name) {
            content.reading = true;
          } else if (name === FAVORITE.name) {
            content.favorite = true;
          } else {
            return;
          }
        }
      }
    } else {
      return;
    }
  },

  remove(id) {
    this.contents = this.contents.filter((item) => item.id !== id);
    this.sync();
    this.init();
  },
};

// User input

class Book {
  constructor(id, title, author, pages, read, favorite, reading) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.favorite = favorite;
    this.reading = reading;
  }
}

// Checking for invalid input

const isEmptyString = (string) => {
  return !string || string.length === 0 || string.trim() === "";
};

const isEmpty = (number) => {
  return isNaN(number);
};

const userInputBook = () => {
  let inputTitle = document.querySelector("#title").value;
  let inputAuthor = document.querySelector("#author").value;
  let inputPages = document.querySelector("#pages").value;
  let inputRead = document.querySelector("input[name='read']:checked").value;

  inputAuthor = inputAuthor.trim();
  inputTitle = inputTitle.trim();
  inputPages = inputPages.trim();
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
      inputPages = "(Unknown)";
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
    resetLibraryToAllBooks();

    // TODO Create popup for alert
    alert(book.title + " was added to your library");
  }
};

function resetLibraryToAllBooks() {
  allSidebarButtons.forEach((item) => {
    item.style.removeProperty("background-color");
  });

  allBooks.style.backgroundColor = "var(--color-orange)";
  libraryHeading.textContent = "ALL Books";
}

// loads display

window.addEventListener("load", () => {
  LIBRARY.init();
  allBooks.style.backgroundColor = "var(--color-orange)";
  showLibray();
});

// creates display

function showLibray() {
  for (let content of LIBRARY.contents) {
    bookGrid.appendChild(createCard(content));
  }
}

// Clear all books from the display

function clearLibrary() {
  while (bookGrid.lastChild.id !== "new-book") {
    bookGrid.removeChild(bookGrid.lastChild);
  }
}

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

// Event listners for form

submitForm.addEventListener("click", addBookToLibrary);

openNewBookForm.addEventListener("click", openForm);

closeNewBookForm.addEventListener("click", closeForm);

// THE SIDEBAR

//Selectors for sidebar

const allBooks = document.querySelector("#all-book");
const readingNow = document.querySelector("#now-book");
const unreadBooks = document.querySelector("#unread-book");
const readBooks = document.querySelector("#already-book");
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

const refineLibrary = (key, value) => {
  let refinedLibrary = LIBRARY.refine(key, value);
  for (let book of refinedLibrary) {
    bookGrid.appendChild(createCard(book));
  }
};

const addEventListenerToButton = (button, key = null, value = null) => {
  button.addEventListener("click", () => {
    changeBackgroundColor(button);
    updateLibraryHeading(button.textContent);
    clearLibrary();
    if (key === null) {
      showLibray();
    } else {
      refineLibrary(key, value);
    }
  });
};

// Event listners for sidebar

addEventListenerToButton(allBooks);
addEventListenerToButton(readingNow, "reading", true);
addEventListenerToButton(unreadBooks, "read", false);
addEventListenerToButton(readBooks, "read", true);
addEventListenerToButton(myFavorites, "favorite", true);



