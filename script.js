// let books = [];

// const addBook = (event) => {
//   event.preventDefault();
//   let book = {
//     id: Date.now(),
//     title: document.querySelector("#title").value,
//     author: document.querySelector("#author").value,
//     pages: document.querySelector("#pages").value,
//     isRead: document.querySelector("#is-read").value
//   }

//   books.push(book);
//   document.forms[0].reset();

//   console.warn("added", {books});
//   let library = document.querySelector(".library");
//   library.textContent = "\n" + JSON.stringify(books, "\t", 2);
//   localStorage.setItem("MyBookList", JSON.stringify(books));
// }


// // saving in local storage 





// document.addEventListener("DOMContentLoaded", () => {
//   document.querySelector("#btn").addEventListener("click", addBook);
// });



