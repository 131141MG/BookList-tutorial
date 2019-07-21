//Book construtor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor
function UI() {}

//Add Book to List
UI.prototype.addBookToList = function(book) {
  //console.log(book);
  const list = document.getElementById('book-list');
  //Create tr element
  const row = document.createElement('tr');

  //Insert cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;
  //console.log(row);
  list.appendChild(row);
};

//Show alert
UI.prototype.showAlert = function(message, className) {
  //Create Div
  const div = document.createElement('div');
  //Add classes
  div.className = `alert ${className}`;
  //Add text
  div.appendChild(document.createTextNode(message));
  //get parent
  const container = document.querySelector('.container');
  //get form
  const form = document.querySelector('#book-form');
  //insert alert
  container.insertBefore(div, form);
  //timeout after 3 secs
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
};

//Delete Book
UI.prototype.deleteBook = function(target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
};

//Clear Fields
UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

//Event Listeners for add book
document.getElementById('book-form').addEventListener('submit', function(e) {
  //get form values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;
  // console.log(title, author, isbn);

  //instantiate book
  const book = new Book(title, author, isbn);

  //instantiate UI
  const ui = new UI();

  console.log(ui);

  //validate
  if (title === '' || author === '' || isbn === '') {
    //Error alert
    ui.showAlert('Please fill all fields', 'error');
  } else {
    //Add book in list
    ui.addBookToList(book);

    //show success
    ui.showAlert('Book added', 'success');

    //Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Even Listener for Delete
document.getElementById('book-list').addEventListener('click', function(e) {
  //instantiate UI
  const ui = new UI();

  //delete book
  ui.deleteBook(e.target);

  //show message
  ui.showAlert('Book Removed', 'success');

  e.preventDefault();
});
