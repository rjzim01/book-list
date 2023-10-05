// Get the Ui elements
const form = document.querySelector('#book-form');
const bookList = document.querySelector('#book-list');

// Book class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// Ui class
class UI {
    //constructor() {}
    static addBookList(book) {
        let list = document.querySelector('#book-list');
        let row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>
            <a href="#" class="delete">X</a>
        </td>
        `;
        list.appendChild(row);

    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static showAlert(message, className) {
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));

        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');

        container.insertBefore(div, form);

        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    static deleteFromBook(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
            Store.removeBook(target.parentElement.previousElementSibling.textContent.trim());
            UI.showAlert('Book removed!', 'success');
        }
        // if(target.hasAttribute('href')) {
        //     target.parentElement.parentElement.remove();
        // }
    }

}

// Local storage class
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books')); // convert string to object
        }
        return books;
    }

    static addBook(book) {
        let books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books)); // convert object to string
    }

    static displayBooks() {
        let books = Store.getBooks();
        books.forEach(book => {
            UI.addBookList(book);
        });
    }

    static removeBook(isbn) {
        let books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books)); // convert object to string
    }
}   




// Add event listener
form.addEventListener('submit', newBook);
bookList.addEventListener('click', deleteBook);
document.addEventListener('DOMContentLoaded', Store.displayBooks());



// form.addEventListener('submit', function(e) {
//     // Get form values
//     const title = document.querySelector('#title').value,
//           author = document.querySelector('#author').value,
//           isbn = document.querySelector('#isbn').value;

//     // Instantiate book
//     const book = new Book(title, author, isbn);

//     console.log(book);

//     e.preventDefault();
// });

// Define function
function newBook(e) {

    let title = document.querySelector('#title').value,
    author = document.querySelector('#author').value,
    isbn = document.querySelector('#isbn').value;

    //let ui = new UI();

    if(title === '' || author === '' || isbn === '') {
        //alert('Please fill in all fields');
        //let ui = new UI();
        UI.showAlert('Please fill in all fields', 'error');
    } else {
        let book = new Book(title, author, isbn);

        //let ui = new UI();

        UI.addBookList(book);

        UI.clearFields();

        UI.showAlert('Book added!', 'success');

        Store.addBook(book);
    }

    e.preventDefault();

}

function deleteBook(e) {
    //let ui = new UI();

    // if(e.target.className === 'delete') {
    //     e.target.parentElement.parentElement.remove();
    //     ui.showAlert('Book removed!', 'success');
    // }

    UI.deleteFromBook(e.target);

    e.preventDefault();
}




