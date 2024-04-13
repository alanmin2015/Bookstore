import { toast } from "react-toastify";

import { booksActions } from "./books-slice";

import books from "../books.json";

// **************************************************** BookList *********************************************
export const getBookList = () => {
  return async (dispatch) => {
    try {
      dispatch(
        booksActions.setBookList({
          BookListData: books,
        })
      );
    } catch (error) {
      toast.error("Getting booklist has something wrong!");
    }
  };
};

export const deleteBook = (bookID) => {
  return async (dispatch) => {
    try {
      dispatch(booksActions.deleteBook({ bookID }));
      toast.success("Delete book successed!")
    } catch (error) {
      toast.error("Delete book has something wrong!");
    }
  };
};

export const createBook = ( data ) => {
  return async (dispatch) => {
    try {
      dispatch(
        booksActions.createBook({
          newBook:data,
        })
      );
      toast.success("Adding book succeed!");
    } catch (error) {
      toast.error("Adding book has something wrong!");
    }
  };
};

export const updateBook = (bookID,bookInfo) => {
  return async (dispatch) => {
    try {
      dispatch(
        booksActions.updateBook({ bookID: bookID,updateBook: bookInfo })
      );
      toast.success("Updating book succeed!");
    } catch (error) {
      toast.error("Updating book has something wrong!");
    }
  };
};


