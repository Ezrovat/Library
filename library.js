const books = [];

function Book(title, author, price, genre) {
    this.id = crypto.randomUUID();
    this.title = title ?? null;
    this.author = author ?? null;
    this.price = Number.isNaN(+price) ? null : +price;
    this.genre = genre ?? null;
}

function addBookToLibrary(title, author, price, genre) {
    books.push(new Book(title, author, price, genre));
}