import { configureStore } from "@reduxjs/toolkit";

import booksSlice from "./books-slice";

const store = configureStore({
  reducer: {
    bookstore: booksSlice.reducer,
  },
});

export default store;
