// Add book to library

let library = [];

const addBookToLibrary = (event) => {
  event.preventDefault();
  console.log(event);
  let inputTitle = document.querySelector("#title").value;
  let inputAuthor = document.querySelector("#author").value;
  let inputPages = document.querySelector("#pages").value;
  let inputRead = document.querySelector("input[name='read']:checked").value;

  let book = {
    id: Date.now(),
    title: inputTitle,
    author: inputAuthor,
    pages: inputPages,
    read: inputRead,
    favorite: false,
    reading_now: false,
  };
  
  library.push(book);
  localStorage.setItem("libraryBooks", JSON.stringify(library));
  document.querySelector("form").reset();
  bookGrid.appendChild(createCard(book));
  closeForm(event);
  alert(book.title + " was added to your library");
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

  // adds image
  card.append(createCardImage());

  // adds book info

  card.append(createCardInfo(book.title, book.author, book.pages));

  // adds card status

  card.append(createCardButtons());

  return card;
};


