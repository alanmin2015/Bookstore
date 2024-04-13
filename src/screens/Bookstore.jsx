import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Joi from "joi-browser";

import { deleteBook } from "../store/books-action";

import CustomTable from "../components/custom/Table/CustomTable";
import BookDetailModal from "./BookDetailModal";

const StyledContainer = styled(Container)`
  margin-top: 10%;
  max-width: 70vw;
`;

const StyledTitle = styled.h1`
  font-family: "Arial", sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const Bookstore = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [modalBookID, setModalBookID] = useState(0);
  const [actionType, setActionType] = useState("add");

  const BookList = useSelector((state) => state.bookstore.BookList);

    //useMemo to hold the current data of clicked book and pass it to the edit book modal to present 
  const currentBookData = useMemo(() => {
    if (actionType === "edit" && modalBookID !== null) {
      return BookList.find((book) => book.id === modalBookID) || {};
    }
    return {};
  }, [BookList, modalBookID, actionType]);

  //create the new book id as we don`t have an backend
  const NewId = useMemo(
    () => BookList.reduce((max, book) => Math.max(book.id, max), 0) + 1,
    [BookList]
  );

  const handleAddBook = () => {
    setShowModal(true);
    setActionType("add");
    setModalBookID(NewId);
  };

  const columns = [
    {
      path: "name",
      label: "Name",
      customContent: {
        type: "edit",
        formInfo: {
          label: "Name",
          id: "name",
          type: "text",
        },
        schema: {
          name: Joi.string().required().label("name"),
        },
        doSubmit: (selectedRow) => {
          setModalBookID(selectedRow.id);
          setShowModal(true);
          setActionType("edit");
        },
      },
    },
    {
      path: "price",
      label: "Price",
    },
    { path: "category", label: "Category" },
    {
      path: "action",
      label: "Action",
      customContent: {
        type: "actions",
        actions: [
          {
            icon: MdDelete,
            doSubmit: (selectedRow) => {
              if (!selectedRow) toast.warning("Please select book!");
              else {
                dispatch(deleteBook(selectedRow.id));
              }
            },
          },
        ],
      },
    },
  ];

  const buttonGroup = {
    upper_right: [
      {
        type: "primary",
        buttonText: "Add a book",
        id: 1,
        handleClick: handleAddBook,
      },
    ],
  };

  return (
    <>
      <StyledContainer>
        <StyledTitle>Bookstore-Alan Min</StyledTitle>
        <CustomTable
          headerData={columns}
          bodyData={BookList}
          buttonGroup={buttonGroup}
        />
      </StyledContainer>
      <BookDetailModal
        show={showModal}
        setShow={setShowModal}
        bookID={modalBookID}
        actionType={actionType}
        bookData={currentBookData}
      />
      <ToastContainer />
    </>
  );
};

export default Bookstore;
