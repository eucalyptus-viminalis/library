// ██████╗  █████╗ ████████╗ █████╗ 
// ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗
// ██║  ██║███████║   ██║   ███████║
// ██║  ██║██╔══██║   ██║   ██╔══██║
// ██████╔╝██║  ██║   ██║   ██║  ██║
// ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝

// HTML DOM
let myElements = {
    books: document.querySelector(".books"),
    yearDropdown: document.querySelector("select#year"),
    formDiv: document.querySelector(".form-div"),
    form: document.querySelector(".add-book-form"),
    addBookBtn: document.querySelector(".btn-add-book"),
    resetBtn: document.querySelector("#reset-btn"),
    addBtn: document.querySelector("#add-btn"),
    closeBtn: document.querySelector("#close-btn"),
    sortMenu: document.querySelector("#sort-menu"),
    orderMenu: document.querySelector("#order-menu"),
}
// ".book" DOM elements
let myBookElements = [];
// Sort Menu
let sortOptions = ["Title", "Author", "Date Added", "Year Published"]
let sortOrder = ["Ascending", "Descending"]

// Filter
let filterOptions = ["All", "Read only", "Unread only"];

// Book Number counter
let bookNum = 0;
// Book objects
let myLibrary = [];
let removedBooks = [];

// ██╗      ██████╗  ██████╗ ██╗ ██████╗
// ██║     ██╔═══██╗██╔════╝ ██║██╔════╝
// ██║     ██║   ██║██║  ███╗██║██║     
// ██║     ██║   ██║██║   ██║██║██║     
// ███████╗╚██████╔╝╚██████╔╝██║╚██████╗
// ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝ ╚═════╝



addPlaceholderBooks();
appendPlaceholderBooks();

appendYearOptions();
appendSortOptions();
appendOrderOptions();

// Add a “NEW BOOK” button that brings up a form allowing users to input the details for the new book: author, title, number of pages, whether it’s been read and anything else you might want.
myElements.formDiv.hidden = true;

// button click listeners
myElements.addBookBtn.addEventListener("click", unhideForm);
myElements.closeBtn.addEventListener("click", hideForm);
myElements.addBtn.addEventListener("click", addBookToLibrary);
myElements.sortMenu.onchange = sort;
myElements.orderMenu.onchange = sort;

// ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
// ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
// █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
// ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
// ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
// ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝

function Book(title, author, year, read) {
    this.bookNum = bookNum,
    this.title = title,
    this.author = author,
    this.year = year,
    this.dateAdded = new Date(),
    this.read = read,
    this.info = function() {
        let readStatus = "not read yet";
        if (this.read) {
            readStatus = "read";
        }
        return `${this.title} by ${this.author}, published in ${year}, ${readStatus}`;
    }
}
// ADD NEW BOOK
function addBookToLibrary() {
    myLibrary.push(new Book(myElements.form.elements.namedItem("title").value, myElements.form.elements.namedItem("author").value, myElements.form.elements.namedItem("year").value, false));
    myElements.form.reset();
    bookNum++;
    newBookElement(myLibrary.length-1);
    console.log(myLibrary);
    console.log(myBookElements);
    appendToDOM(myBookElements[myBookElements.length-1]);
    hideForm();
}
// TODO: remove these later
function addPlaceholderBooks() {
    myLibrary.push(new Book("Nineteen Eighty-Four", "George Orwell", 1949, false));
    bookNum++;
    myLibrary.push(new Book("The Winter of Our Discontent", "John SteinBeck", 1961, false));
    bookNum++;
    myLibrary.push(new Book("The Miracle of Language", "Richard Lederer", 1999, false));
    bookNum ++;
}
function appendPlaceholderBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        newBookElement(i);
        appendToDOM(myBookElements[i]);
    }
}
function appendToDOM(bookElement) {
    myElements.books.appendChild(bookElement);
}
function hideForm() {
    myElements.formDiv.hidden = true;
}
function unhideForm() {
    myElements.formDiv.hidden = false;
    document.querySelector("input#title").focus();
}
function appendYearOptions() {
    let element;
    for (let i = 2021; i > 1900; i--) {
        element = document.createElement("option");
        element.value = i;
        element.textContent = i;
        myElements.yearDropdown.appendChild(element);
    }
}
function appendSortOptions() {
    let element;
    for (let i = 0; i < sortOptions.length; i++) {
        element = document.createElement("option");
        element.value = sortOptions[i];
        element.textContent = sortOptions[i];
        myElements.sortMenu.appendChild(element);
    }
}
function appendOrderOptions() {
    let element;
    for (let i = 0; i < sortOrder.length; i++) {
        element = document.createElement("option");
        element.value = sortOrder[i];
        element.textContent = sortOrder[i];
        myElements.orderMenu.appendChild(element);
    }
}
// Write a function that loops through the array and displays each book on the page. You can display them in some sort of table, or each on their own “card”. It might help for now to manually add a few books to your array so you can see the display.
function newBookElement(bookNum) {
    let bookElement = document.createElement("div");
    bookElement.className = "book";
    bookElement.dataset.bookNum = bookNum;
    bookElement.appendChild(titleElement(myLibrary[bookNum]));
    bookElement.appendChild(authorElement(myLibrary[bookNum]));
    bookElement.appendChild(yearElement(myLibrary[bookNum]));
    bookElement.appendChild(dateAddedElement(myLibrary[bookNum]));
    bookElement.appendChild(markReadButton());
    bookElement.appendChild(removeButton());
    myBookElements.push(bookElement);
}
function toggleReadStatus(bookNum) {
    if (myLibrary[bookNum].read) {
        bookElement.classList.toggle("green-bg");
    }
    else {
        bookElement.classList.toggle("red-bg");
    }
}
function titleElement(book) {
    let element = document.createElement("h2");
    element.className = "book-title";
    element.textContent = book.title;
    return element;
}
function authorElement(book) {
    let element = document.createElement("h3");
    element.className = "book-author";
    element.textContent = book.author;
    return element;
}
function yearElement(book) {
    let element = document.createElement("h3");
    element.className = "book-year";
    element.textContent = book.year;
    return element;
}
function dateAddedElement(book) {
    let element = document.createElement("h3");
    element.className = "book-date-added";
    element.textContent = "Date added: " + book.dateAdded;
    return element;
}
// Add a button on each book’s display to change its read status.
// To facilitate this you will want to create the function that toggles a book’s read status on your Book prototype instance.
function markReadButton() {
    let element = document.createElement("button");
    element.className = "btn-mark-read";
    element.id = "markRead";
    element.type = "button";
    element.textContent = "Mark Read";
    element.onclick = markRead;
    return element;
}
function markRead() {
    console.log("book mark read");
    myLibrary[this.parentNode.dataset.bookNum].read = true;
    this.disabled = true;
    console.log(this);
    console.log(myLibrary);
    addReadAgainBtn(this);
}
// Add a button on each book’s display to remove the book from the library.
// You will need to associate your DOM elements with the actual book objects in some way. One easy solution is giving them a data-attribute that corresponds to the index of the library array.
function removeButton() {
    let element = document.createElement("button");
    element.className = "btn-remove-book";
    element.id = "remove";
    element.type = "button";
    element.textContent = "Remove Book";
    element.onclick = removeBook;
    return element;
}
function removeBook() {
    console.log("removed book");
    let bookNum = this.parentNode.dataset.bookNum;
    removedBooks.push(myLibrary[bookNum]);
    delete myBookElements[bookNum];
    delete myLibrary[bookNum];
    bookNum--;
    myElements.books.removeChild(this.parentNode);
    console.log(myLibrary);
    console.log(myBookElements);
}

function addReadAgainBtn(bookElement) {
    let element = document.createElement("button");
    element.className = "btn-read-again";
    element.type = "button";
    element.textContent = "Read Again";
    element.onclick = readAgain;
    bookElement.parentNode.appendChild(element);
}
function readAgain() {
    myLibrary[this.parentNode.dataset.bookNum].read = false;
    this.parentNode.querySelector(".btn-mark-read").disabled = false;
    this.parentNode.removeChild(this);
}
function sort() {
    switch (myElements.sortMenu.selectedIndex) {
        case 0:
            sortByTitle();
            break;
        case 1:
            sortByAuthor();
            break;
        case 2:
            sortByDateAdded();
            break;
        case 3:
            sortByYearPublished();
            break;
    }
}
function sortByTitle() {
    for (let i = 0; i < myElements.books.childElementCount; i++) {
        myElements.books.lastElementChild.remove();
    }
    let sortedArray = [...myBookElements];
    sortedArray.sort((a,b) => (a.children[0].textContent.toLowerCase() > b.children[0].textContent.toLowerCase() ? 1 : -1));
    if (myElements.orderMenu.selectedIndex == 0) {
        for (let i = 0; i < sortedArray.length; i++) {
            myElements.books.appendChild(sortedArray[i]);
        }
    } else {
        for (let i = sortedArray.length-1; i >= 0; i--) {
            myElements.books.appendChild(sortedArray[i]);
        } 
    }
    
}
function sortByAuthor() {
    console.log("in author")
    for (let i = 0; i < myElements.books.childElementCount; i++) {
        myElements.books.lastElementChild.remove();
    }
    let sortedArray = [...myBookElements];
    sortedArray.sort((a,b) => (a.children[1].textContent.toLowerCase() > b.children[1].textContent.toLowerCase() ? 1 : -1));
    if (myElements.orderMenu.selectedIndex == 0) {
        for (let i = 0; i < sortedArray.length; i++) {
            myElements.books.appendChild(sortedArray[i]);
        }
    } else {
        for (let i = sortedArray.length-1; i >= 0; i--) {
            myElements.books.appendChild(sortedArray[i]);
        } 
    }
}
function sortByYearPublished() {
    for (let i = 0; i < myElements.books.childElementCount; i++) {
        myElements.books.lastElementChild.remove();
    }
    let sortedArray = [...myBookElements];
    sortedArray.sort((a,b) => (a.children[2].textContent.toLowerCase() > b.children[2].textContent.toLowerCase() ? 1 : -1));
    if (myElements.orderMenu.selectedIndex == 0) {
        for (let i = 0; i < sortedArray.length; i++) {
            myElements.books.appendChild(sortedArray[i]);
        }
    } else {
        for (let i = sortedArray.length-1; i >= 0; i--) {
            myElements.books.appendChild(sortedArray[i]);
        } 
    }
}
function sortByDateAdded() {
    for (let i = 0; i < myElements.books.childElementCount; i++) {
        myElements.books.lastElementChild.remove();
    }
    let sortedArray = [...myBookElements];
    sortedArray.sort((a,b) => (a.children[3].textContent.toLowerCase() > b.children[3].textContent.toLowerCase() ? 1 : -1));
    if (myElements.orderMenu.selectedIndex == 0) {
        for (let i = 0; i < sortedArray.length; i++) {
            myElements.books.appendChild(sortedArray[i]);
        }
    } else {
        for (let i = sortedArray.length-1; i >= 0; i--) {
            myElements.books.appendChild(sortedArray[i]);
        } 
    }
}