const addBookButton = document.querySelector(".add-book-btn");
const modal = document.querySelector(".modal-overlay");
const closeBtn = document.querySelector(".close-btn");
const form = document.querySelector("#add-book-form");
const container = document.querySelector(".container-books");

addBookButton.addEventListener("click", () => {
    modal.classList.toggle("active");
})

closeBtn.addEventListener("click", () => {
    modal.classList.toggle("active");
})

// Create a Book constructor
class Book {
    constructor (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    }

    toggleReadStatus() {
        this.read = !this.read;
    }
}

// Create a function to add book to the library
function addBook(book) {
    // Check to see if the book already exists
    const existingBooks = container.querySelectorAll(".book-card .title");
    for (let i = 0; i < existingBooks.length; i++) {
        const title = existingBooks[i].textContent.trim();
        const author = existingBooks[i].nextElementSibling.textContent.trim();
        if (book.title === title && book.author === author) {
            alert("This book already exists in the library.");
            return;
        }
    }

    // Save the updated library to local storage
    localStorage.setItem("library", JSON.stringify(myLibrary));
    // Create new book card
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    // Create title element and add to book card
    const bookTitle = document.createElement("span");
    bookTitle.classList.add("title");
    bookTitle.textContent = book.title;
    bookCard.appendChild(bookTitle);
    // Create author element and add to book card
    const bookAuthor = document.createElement("span");
    bookAuthor.classList.add("author");
    bookAuthor.textContent = book.author;
    bookCard.appendChild(bookAuthor);
    // Create pages element and add to book card 
    const bookPages = document.createElement("span");
    bookPages.classList.add("pages");
    bookPages.textContent = book.pages;
    bookCard.appendChild(bookPages);
    // Create read status element and add to book card 
    const readStatus = document.createElement("span");
    readStatus.classList.add("read-status");
    readStatus.textContent = book.read ? "Read" : "Unread";
    bookCard.appendChild(readStatus);
    readStatus.addEventListener("click", () => {
        book.toggleReadStatus();
        readStatus.textContent = book.read ? "Read" : "Unread";
        // Update the local storage with the updated book
        localStorage.setItem("library", JSON.stringify(myLibrary));
    });
    // Create edit icon and add it inside of the readStatus
    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.textContent = "Edit";
    bookCard.appendChild(editButton);
    // Create remove button and add to book card
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = "Remove";
    bookCard.appendChild(removeButton);
    // Add book card to the container 
    container.appendChild(bookCard);
}

// Add event listener to the remove button to remove book from from library
container.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-button")) {
        container.removeChild(event.target.parentElement);
    }
    // Update the local storage with the updated library
    localStorage.setItem("library", JSON.stringify(myLibrary));
});

// Initialize the library array with the books from local storage
let myLibrary = JSON.parse(localStorage.getItem("library")) || [];

// Loop through the library array and add each book to the UI
myLibrary.forEach((book) => {
  addBookToLibrary(book);
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.querySelector("#book-title").value;
    const author = document.querySelector("#book-author").value;
    const pages = document.querySelector("#book-pages").value;
    const read = document.querySelector("#read").checked;
    // Create a new book object and add it to the library 
    const book = new Book(title, author, pages, read);
    addBook(book);
    // Reset form 
    form.reset();
    modal.classList.toggle("active");
});