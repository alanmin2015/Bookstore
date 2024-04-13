import React from "react";
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import Bookstore from "./screens/Bookstore";
import { getBookList } from "./store/books-action";

function App() {
  const dispatch = useDispatch();

  //use redux to get data from json 
  dispatch(getBookList());

  const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  `;
  
  return (
     <>
    <ToastContainer />
    <AppContainer>
      <Routes>
        <Route path="/" element={<Bookstore />} />
      </Routes>
    </AppContainer>
  </>
  );
}

export default App;
