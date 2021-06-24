// Book Class: Represents a Book
class Book {
  constructor(title, author, genre) {
    this.title = title;
    this.author = author;
    this.genre = genre;
  }
}

// UI Class: Handle UI Tasks
class UI {
  // Static key word means a static method(function) of a class
  static displayBooks() {
    const StoredBooks = [
      {
        title: "Book 1",
        author: "John",
        genre: "Horror",
      },
      {
        title: "Book 2",
        author: "Jane",
        genre: "Fantasy",
      },
    ];

    const books = StoredBooks;

    // Loop through the array of books
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");

    // Create rows with title, author and genre obtained by looping through array of books
    row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td><i class="btn-danger btn-sm fas fa-times delete"></i></td>
        `;

    list.appendChild(row);
  }

  // This method will remove the book that will have the class delete
  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove(); // We remove the parent element so the entire row is deleted
    }
  }

  static showAlert(message, className) {}

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#genre").value = "";
  }
}

// Stores Class: Handles Storage

// Event: Display Book
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  // Prevent default behaviour of the submit button (stop from reloading entire page on every click)
  e.preventDefault();

  // Get values from form inputs
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const genre = document.querySelector("#genre").value;

  // Validate if input fields are empty
  if (title === "" || author === "" || genre === "") {
    alert("Please fill all the fields");
  } else {
    // Instantiate book (make book instance)
    const book = new Book(title, author, genre);

    // Add Book to the UI
    UI.addBookToList(book);

    // Clear input fields after submitting
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target); // e.target will select the element that you click on
});
