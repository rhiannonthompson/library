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
  formPopup.style.visibility = "visible";
  formPopup.style.zIndex = "10";
  siteOverlay.style.zIndex = "9";
};

// Close form

const closeForm = (event) => {
  event.preventDefault();
  siteOverlay.style.visibility = "hidden";
  formPopup.style.visibility = "hidden";
  formPopup.zIndex = "-1";
  siteOverlay.style.zIndex = "-1";
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

const createCard = (book) => {
  const card = document.createElement("div");
  card.className = "card card-into-container";

  // adds image
  const imgContainer = document.createElement("div");
  imgContainer.className = "card-img";
  const img = document.createElement("img");
  img.src = "images/books.jpg";

  card.append(imgContainer);
  imgContainer.append(img);

  // adds book info

  const bookInfo = document.createElement("div");
  bookInfo.className = "book-info";
  const bookTitle = document.createElement("p");
  bookTitle.className = "book-title";
  bookTitle.textContent = book.title;
  const bookAuthor = document.createElement("p");
  bookAuthor.className = "author";
  bookAuthor.textContent = book.author;
  const bookPages = document.createElement("p");
  bookPages.className = "pages";
  bookPages.textContent = book.pages;

  card.append(bookInfo);
  bookInfo.append(bookTitle);
  bookInfo.append(bookAuthor);
  bookInfo.append(bookPages);

  // adds card status

  const bookStatus = document.createElement("div");
  bookStatus.className = "book-status";

  const tooltipRead = document.createElement("div");
  tooltipRead.className = "tooltip";
  const btnRead = document.createElement("button");
  btnRead.className = "btn read";
  const readIcon = document.createElement("i");
  readIcon.className = "fas fa-book";
  const tooltipBox = document.createElement("div");
  tooltipBox.className = "tooltipbox";
  const tooltipText = document.createElement("p");
  tooltipText.textContent = "Already read";

  card.append(bookStatus);
  bookStatus.append(tooltipRead);
  tooltipRead.append(btnRead);
  btnRead.append(readIcon);
  tooltipRead.append(tooltipBox);
  tooltipBox.append(tooltipText);

  const tooltipReading = document.createElement("div");
  tooltipReading.className = "tooltip";
  const btnReading = document.createElement("button");
  btnReading.className = "btn favorite";
  const readingIcon = document.createElement("i");
  readingIcon.className = "fas fa-book-reader";
  const tooltipBoxReading = document.createElement("div");
  tooltipBoxReading.className = "tooltipbox";
  const tooltipTextReading = document.createElement("p");
  tooltipTextReading.textContent = "Reading Now";

  bookStatus.append(tooltipReading);
  tooltipReading.append(btnReading);
  btnReading.append(readingIcon);
  tooltipReading.append(tooltipBoxReading);
  tooltipBoxReading.append(tooltipTextReading);

  const tooltipFav = document.createElement("div");
  tooltipFav.className = "tooltip";
  const btnFav = document.createElement("button");
  btnFav.className = "btn favorite";
  const favIcon = document.createElement("i");
  favIcon.className = "fas fa-heart";
  const tooltipBoxFav = document.createElement("div");
  tooltipBoxFav.className = "tooltipbox";
  const tooltipTextFav = document.createElement("p");
  tooltipTextFav.textContent = "Favorite";

  bookStatus.append(tooltipFav);
  tooltipFav.append(btnFav);
  btnFav.append(favIcon);
  tooltipFav.append(tooltipBoxFav);
  tooltipBoxFav.append(tooltipTextFav);

  const tooltipDel = document.createElement("div");
  tooltipDel.className = "tooltip";
  const btnDel = document.createElement("button");
  btnDel.className = "btn favorite";
  const delIcon = document.createElement("i");
  delIcon.className = "fas fa-trash-alt";
  const tooltipBoxDel = document.createElement("div");
  tooltipBoxDel.className = "tooltipbox";
  const tooltipTextDel = document.createElement("p");
  tooltipTextDel.textContent = "Remove book";

  bookStatus.append(tooltipDel);
  tooltipDel.append(btnDel);
  btnDel.append(delIcon);
  tooltipDel.append(tooltipBoxDel);
  tooltipBoxDel.append(tooltipTextDel);

  return card;
};

const createImageContainer = () => {
  const imageContainer = document.createElement("div");
  imageContainer.className = "card card-into-container";
  const img = document.createElement("img");
  img.src = "images/books.jpg";
  imgContainer.append(img);
  
  return imageContainer;
}
