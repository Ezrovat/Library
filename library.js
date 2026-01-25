const books = [];
class Book {
    constructor(title, author, price, genre, imgFile, read) {
        this.id = crypto.randomUUID();
        this.imgFile = imgFile;
        this.title = title ?? null;
        this.author = author ?? null;
        this.price = Number.isNaN(+price) ? null : Number(price).toFixed(2);
        this.genre = genre ?? null;
        this.read = read;
    }

    markRead() {
        this.read = !this.read;
        document.querySelector(`input[id=\'${this.id}_read\']`).checked = this.read;
    }
}

addBookToLibrary(
    "Il Signore degli Anelli: La Compagnia dell'Anello",
    "Tolkien",
    39.40,
    "Fantasy",
    "booksImage/laCompagniaDell\'anello.jpg",
    true
)

displayBooks()

/*function Book(title, author, price, genre, imgFile, read) {
    this.id = crypto.randomUUID();
    this.imgFile = imgFile;
    this.title = title ?? null;
    this.author = author ?? null;
    this.price = Number.isNaN(+price) ? null : Number(price).toFixed(2);
    this.genre = genre ?? null;
    this.read = read;
}

Book.prototype.markRead = function() {
    this.read = !this.read;
    document.querySelector(`input[id=\'${this.id}_read\']`).checked = this.read;
}*/



function addBookToLibrary(title, author, price, genre,imgFile, read) {
    books.push(new Book(title, author, price, genre, imgFile, read));
}

function displayBooks() {
    const library = document.querySelector(".book-container");
    books.forEach(b => {
        library.appendChild(buildBookHtml(b));
    })
}


function buildBookHtml(book) {
    const bookContainerDiv = document.createElement("div");
    bookContainerDiv.dataset.bookId = book.id;
    const ulBookProps = document.createElement("ul");
    const buttonContainerDiv = document.createElement("div");
    const removeButtonLi = document.createElement("button");
    const markReadButtonLi = document.createElement("button");

    removeButtonLi.addEventListener("click", (e) => { 
        const bookId = e.currentTarget.dataset.bookId;
        const bookIndex = books.findIndex(b => b.id === bookId);
        books.slice(bookIndex,1);
        document.querySelector(`div[data-book-id=\'${bookId}\']`).remove();
    });
    markReadButtonLi.addEventListener("click", (e) => books.find(b => b.id===e.currentTarget.dataset.bookId).markRead());

    buttonContainerDiv.setAttribute("class", "book-button");
    removeButtonLi.dataset.bookId = book.id;
    removeButtonLi.textContent = "Remove";
    markReadButtonLi.textContent = "Mark";
    markReadButtonLi.dataset.bookId = book.id;
    for(const key in book) {
        if(!Object.hasOwn(book, key)) {
            continue;
        }
        const propLi = document.createElement("li");

        if(key === "imgFile") {
            const imgElement = document.createElement("img");
            imgElement.src = book[key];
            imgElement.alt = `Copertina ${book.title}`;
            propLi.appendChild(imgElement);
        }

        else if (key === "read") {
            propLi.setAttribute("class", "read-checkbox");
            const checkBoxInput = document.createElement("input");
            checkBoxInput.setAttribute("type", "checkbox");
            checkBoxInput.setAttribute("readOnly", "true");
            checkBoxInput.setAttribute("id",`${book.id}_read`);
            const checkboxLabel = document.createElement("label");
            checkboxLabel.textContent = "Read";
            checkboxLabel.setAttribute("for",`${checkBoxInput.getAttribute("id")}`);
            propLi.appendChild(checkboxLabel);
            propLi.appendChild(checkBoxInput);
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

    buttonContainerDiv.append(removeButtonLi, markReadButtonLi);
    ulBookProps.appendChild(buttonContainerDiv);
    bookContainerDiv.appendChild(ulBookProps);
    return bookContainerDiv;
}

const dialog = document.querySelector("dialog");
const newBookButton = document.querySelector(".new-book > button");
const cancelButton = document.querySelector("#cancel");
const submitButton = document.querySelector("button[type=submit]");
document.querySelector("input[id*=\'read\']").addEventListener("click", (e) => e.preventDefault());


newBookButton.addEventListener("click", () => dialog.showModal());
cancelButton.addEventListener("click", () => dialog.close());
submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const price = document.querySelector("#price").value;
    const genre = document.querySelector("#genre").value;
    const file = document.querySelector("#imgFile").files?.[0];
    const imgFile = file ? URL.createObjectURL(file) : null;
    addBookToLibrary(title, author, price, genre, imgFile,false);
    const library = document.querySelector(".book-container");
    library.appendChild(buildBookHtml(books[books.length-1]));
    console.table(books);
    dialog.close();
} )

