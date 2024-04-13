import { createSlice } from "@reduxjs/toolkit";

const booksSlice = createSlice({
  name: "bookstore",
  initialState: {
    BookList: [],
  },
  reducers: {
    // ************************************************* Booklist *****************************************
    setBookList(state, action) {
      state.BookList = action.payload.BookListData;
    },

    deleteBook(state, action) {
      const rowToDelete = state.BookList.findIndex(
        (book) => book.id === action.payload.bookID
      );
      if (rowToDelete !== -1) {
        state.BookList.splice(rowToDelete, 1);
      }
    },

    createBook(state, action) {
      const newRow = {
        ...action.payload.newBook,
      };
      state.BookList.push(newRow);
    },

    updateBook(state, action) {
      const  updateBook  = action.payload.updateBook;
      const bookID  = action.payload.bookID;
      const index = state.BookList.findIndex((book) => book.id === bookID);
      if (index >= 0) {
        state.BookList[index] = updateBook;
      }
    },
  },
});

export const booksActions = booksSlice.actions;

export default booksSlice;
