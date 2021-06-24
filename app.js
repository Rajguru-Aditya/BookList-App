// Book Class: Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
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
        isbn: "Horror",
      },
      {
        title: "Book 2",
        author: "Jane",
        isbn: "Fantasy",
      },
    ];

    const books = StoredBooks;

    // Loop through the array of books
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");

    // Create rows with title, author and isbn obtained by looping through array of books
    row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
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

  // Show alert message if book was added successfully or not
  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    // Make the alert disappear in 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

// Stores Class: Handles Storage. Storing books in local storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(book) {}
}

// Event: Display Book
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  // Prevent default behaviour of the submit button (stop from reloading entire page on every click)
  e.preventDefault();

  // Get values from form inputs
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  // Validate if input fields are empty
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill all the fields", "danger"); // Show error message if all fields are not filled
  } else {
    // Instantiate book (make book instance)
    const book = new Book(title, author, isbn);

    // Add Book to the UI
    UI.addBookToList(book);

    // Show success message after book is added
    UI.showAlert("Book added!", "success");

    // Clear input fields after submitting
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target); // e.target will select the element that you click on

  // Show success message after book is removed
  UI.showAlert("Book removed!", "success");
});
