import React, { Component } from "react";
import PropTypes from "prop-types";
import { debounce } from "throttle-debounce";
import BooksGrid from "./BooksGrid";
import * as BooksAPI from "./BooksAPI";

class SeachBooks extends Component {
  constructor() {
    super();
    this.callAjax = debounce(300, this.callAjax);
  }

  state = {
    books: [],
    query: ""
  };

  seachQuery(query) {
    query = query.trim();
    let listBooks = [];

    if (query) {
      BooksAPI.search(query)
        .then(books => {
          if (!books.error) {
            let tListaBookStatus = this.props.read.concat(
              this.props.currentlyReading.concat(this.props.wantToRead)
            );

            books.forEach(function(emp) {
              var company = tListaBookStatus.filter(function(comp) {
                return comp.id === emp.id;
              })[0];

              if (company) {
                listBooks.push(company);
              } else {
                listBooks.push(emp);
              }
            });

            this.setState({ books: listBooks });
          } else {
            this.setState({ books: [] });
          }
        })
        .catch(error => {
          alert(error);
        });
    } else {
      this.setState({ books: [], query: query });
    }
  }

  static propTypes = {
    showSearchPage: PropTypes.string,
    onCloseSeach: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
  };

  styleDef = book => {
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

  defaultValueDef = book => {
    if (book.shelf) {
      return book.shelf;
    } else {
      return "none";
    }
  };
  searchChange(e) {
    this.callAjax(e.target.value);
  }
  callAjax(value) {
    this.seachQuery(value);
  }

  render() {
    const { onCloseSeach, onUpdate } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-content">
          <div>
            <div className="search-books">
              <div className="search-books-bar">
                <a className="close-search" onClick={() => onCloseSeach(false)}>
                  Close
                </a>

                <div>
                  {/*
                            NOTES: The search from BooksAPI is limited to a particular set of search terms.
                            You can find these search terms here:
                            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                            you don't find a specific author or title. Every search is limited by search terms.
                            */}
                  <input
                    type="text"
                    placeholder="Search by title or author...."
                    onKeyUp={this.searchChange.bind(this)}
                  />
                  <BooksGrid books={this.state.books} onUpdate={onUpdate} />
                </div>
              </div>

              <div className="search-books-results">
                <ol className="books-grid" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SeachBooks;
