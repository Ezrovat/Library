const books = [];
addBookToLibrary(
    "Il Signore degli Anelli: La Compagnia dell'Anello",
    "Tolkien",
    39.40,
    "Fantasy",
    "booksImage/laCompagniaDell\'anello.jpg"
)

displayBooks();

function Book(title, author, price, genre, imgFile) {
    this.id = crypto.randomUUID();
    this.imgFile = imgFile;
    this.title = title ?? null;
    this.author = author ?? null;
    this.price = Number.isNaN(+price) ? null : Number(price).toFixed(2);
    this.genre = genre ?? null;
}

function addBookToLibrary(title, author, price, genre,imgFile) {
    books.push(new Book(title, author, price, genre, imgFile));
}

function displayBooks() {
    const library = document.querySelector(".book-container");
    books.forEach(b => {
        library.appendChild(buildBookHtml(b));
    })
}

function buildBookHtml(book) {
    const bookContainerDiv = document.createElement("div");
    const ulBookProps = document.createElement("ul");
    for(const key in book) {
        const propLi = document.createElement("li");

        if(key === "imgFile") {
            const imgElement = document.createElement("img");
            imgElement.src = book[key];
            imgElement.alt = `Copertina ${book.title}`;
            propLi.appendChild(imgElement);
        }

        else if(key !== "id"){
            const propertyName = key[0].toUpperCase() + key.slice(1);
            propLi.textContent = `${propertyName}  `;
            propLi.appendChild(document.createElement("br"));
            const boldElement = document.createElement("b");
            boldElement.textContent = String(book[key]);
            propLi.appendChild(boldElement);
        }

        ulBookProps.appendChild(propLi);
        
    }

    bookContainerDiv.appendChild(ulBookProps);
    return bookContainerDiv;
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