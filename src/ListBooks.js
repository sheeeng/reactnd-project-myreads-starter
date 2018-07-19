import React from "react";
import PropTypes from "prop-types";
import BooksGrid from "./BooksGrid";
import { Link } from "react-router-dom";

const ListBooks = ({
  booksCurrentlyReading,
  booksWantToRead,
  booksRead,
  onUpdate
}) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <BooksGrid books={booksCurrentlyReading} onUpdate={onUpdate} />
            </div>
          </div>

          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <BooksGrid books={booksWantToRead} onUpdate={onUpdate} />
            </div>
          </div>

          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <BooksGrid books={booksRead} onUpdate={onUpdate} />
            </div>
          </div>
        </div>
      </div>

      <div className="open-search">
        <Link to="/search" className="open-search">
          Add a book
        </Link>
      </div>
    </div>
  );
};

ListBooks.propTypes = {
  booksCurrentlyReading: PropTypes.array.isRequired,
  booksWantToRead: PropTypes.array.isRequired,
  booksRead: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default ListBooks;
