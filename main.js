/* eslint-disable no-unused-vars, no-use-before-define, consistent-return, class-methods-use-this, no-undef*/
const bookArray = localStorage.getItem('books')
  ? JSON.parse(localStorage.getItem('books'))
  : [];
localStorage.setItem('books', JSON.stringify(bookArray));
const library = JSON.parse(localStorage.getItem('books'));

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  createList(book) {
    const li = document.createElement('li');
    li.textContent = `${book.title} - by ${book.author}`;
    const button = document.createElement('button');
    button.setAttribute('class', 'rmItem');
    button.innerHTML = 'Remove';
    button.addEventListener('click', book.remove);
    li.appendChild(button);
    const ul = document.getElementById('bookList');
    ul.appendChild(li);
  }

  remove(e) {
    const takeItem = document.querySelectorAll('.rmItem');
    const bookIndex = bookArray.indexOf.call(takeItem, e.target);
    bookArray.splice(bookIndex, 1);
    localStorage.setItem('books', JSON.stringify(bookArray));
    const updatedLibrary = JSON.parse(localStorage.getItem('books'));
    document.getElementById('bookList').innerHTML = '';
    updatedLibrary.forEach((item) => {
      const libr = new Book(item.title, item.author);
      libr.createList(libr);
    });
  }

  add() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const book = new Book(title, author);
    if (title === '' && author === '') {
      return false;
    }
    bookArray.push(book);
    localStorage.setItem('books', JSON.stringify(bookArray));
    this.createList(book);
  }
}

const lib = new Book();
library.forEach((item) => {
  const libr = new Book(item.title, item.author);
  lib.createList(libr);
});

const time = document.getElementById('local-time');
const now = luxon.DateTime.now();
time.innerHTML = now.toLocaleString(luxon.DateTime.DATETIME_MED);

/* eslint-enable no-unused-vars, no-use-before-define, consistent-return, class-methods-use-this, no-undef */
