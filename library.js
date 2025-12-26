const books = [];

function Book(title, author, price, genre, imgLink, imgFile) {
    this.id = crypto.randomUUID();
    this.title = title ?? null;
    this.author = author ?? null;
    this.price = Number.isNaN(+price) ? null : +price;
    this.genre = genre ?? null;
    this.imgLink = imgLink ?? null;
    this.imgFile = imgFile;
}

function addBookToLibrary(title, author, price, genre,imgLink,imgFile) {
    books.push(new Book(title, author, price, genre,imgLink, imgFile));
}

const dialog = document.querySelector("dialog");
const newBookButton = document.querySelector(".new-book > button");
const cancelButton = document.querySelector("#cancel");

newBookButton.addEventListener("click", () => dialog.showModal());
cancelButton.addEventListener("click", () => dialog.close());