const form = document.querySelector("#add-book-form");
const container = document.querySelector(".container-books");

// Create a Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Create a function to add book to the library
function addBook(book) {
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
    // Create remove button and add to book card
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = "Remove";
    bookCard.appendChild(removeButton);
    // Add book card to the container 
    container.appendChild(bookCard);

}

container.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-button")) {
        container.removeChild(event.target.parentElement);
    }
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
});
