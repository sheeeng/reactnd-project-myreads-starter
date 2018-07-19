import React from "react";
import PropTypes from "prop-types";

const BooksGrid = ({ books, onUpdate }) => {
  const styleDef = book => {
    let style = {
      width: 128,
      height: 193,
      backgroundImage: ""
    };
    if (book.imageLinks) {
      style.backgroundImage = 'url("' + book.imageLinks.thumbnail + ")";
    }
    return style;
  };

  const defaultValueDef = book => {
    if (book.shelf) {
      return book.shelf;
    } else {
      return "none";
    }
  };

  return (
    <div>
      {books.length > 0 && (
        <ol className="books-grid">
          {books.map(book => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={styleDef(book)} />

                  <div className="book-shelf-changer">
                    <select
                      defaultValue={defaultValueDef(book)}
                      onChange={event => onUpdate(book, event.target.value)}
                    >
                      <option value="move" disabled>
                        Move to...
                      </option>
                      <option value="currentlyReading">
                        Currently Reading
                      </option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

BooksGrid.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  books: PropTypes.array
};

export default BooksGrid;
