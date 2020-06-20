const books = document.querySelectorAll('.book');

books[0].before(books[1]);
books[3].before(books[4]);
books[2].before(books[4]);

books[2].before(books[3]);
books[2].before(books[5]);


// books[0].prepend(books[5]);


console.log(books)