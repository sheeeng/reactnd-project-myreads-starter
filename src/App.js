import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import ListBooks from "./ListBooks";
import * as BooksAPI from "./BooksAPI";
import PropTypes from "prop-types";
import SearchBooks from "./SearchBooks";

class BooksApp extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    none: []
  };

  static propTypes = {
    currentlyReading: PropTypes.array,
    wantToRead: PropTypes.array,
    read: PropTypes.array,
    none: PropTypes.array
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({
          currentlyReading: books.filter(books => {
            return books.shelf === "currentlyReading";
          }),
          wantToRead: books.filter(books => {
            return books.shelf === "wantToRead";
          }),
          read: books.filter(books => {
            return books.shelf === "read";
          }),
          none: books.filter(books => {
            return books.shelf === "none";
          })
        });
      })
      .catch(error => {
        alert(error);
      });
  }

  onUpdate = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(book => {
        this.componentDidMount();
      })
      .catch(error => {
        alert(error);
      });
  };

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={({ history }) => (
            <SearchBooks
              currentlyReading={this.state.currentlyReading}
              wantToRead={this.state.wantToRead}
              read={this.state.read}
              onCloseSearch={() => {
                history.push("/");
              }}
              onUpdate={(book, shelf) => {
                this.onUpdate(book, shelf);
              }}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              booksCurrentlyReading={this.state.currentlyReading}
              booksWantToRead={this.state.wantToRead}
              booksRead={this.state.read}
              onUpdate={(book, shelf) => {
                this.onUpdate(book, shelf);
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
