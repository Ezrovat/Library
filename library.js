const books = [];
addBookToLibrary(
    "Il Signore degli Anelli: La Compagnia dell'Anello",
    "Tolkien",
    39.40,
    "Fantasy",
    "booksImage\laCompagniaDell'anello.jpg"
)

displayBooks();

function Book(title, author, price, genre, imgFile) {
    this.id = crypto.randomUUID();
    this.title = title ?? null;
    this.author = author ?? null;
    this.price = Number.isNaN(+price) ? null : +price;
    this.genre = genre ?? null;
    this.imgFile = imgFile;
}

function addBookToLibrary(title, author, price, genre,imgFile) {
    books.push(new Book(title, author, price, genre, imgFile));
}

function displayBooks() {
    const library = document.querySelector(".book-container");
    books.forEach(b => {
        const bookContainerDiv = document.createElement("div");
    })
}

const dialog = document.querySelector("dialog");
const newBookButton = document.querySelector(".new-book > button");
const cancelButton = document.querySelector("#cancel");
const submitButton = document.querySelector("button[type=submit]");


newBookButton.addEventListener("click", () => dialog.showModal());
cancelButton.addEventListener("click", () => dialog.close());
submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const price = document.querySelector("#price").value;
    const genre = document.querySelector("#genre").value;
    const imgFile = document.querySelector("#imgFile").value;
    addBookToLibrary(title, author, price, genre, imgFile);
    //displayBooks();
    console.table(books);
    dialog.close();
} )