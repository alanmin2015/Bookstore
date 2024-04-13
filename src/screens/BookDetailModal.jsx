import React from "react";
import { useDispatch } from "react-redux";

import Joi from "joi-browser";
import { createBook, updateBook } from "../store/books-action";

import CustomModal from "../components/custom/Model/CustomModal";
import CustomForm from "../components/custom/Form/CustomForm";

const BookDetailModal = ({
  show,
  setShow,
  bookID,
  actionType,
  bookData,
}) => {
  const dispatch = useDispatch();

  //swtich the modal title and button text based on it is edit or add new book
  const title = actionType === "edit" ? "Edit Book" : "Add Book";
  const buttonLabel = actionType === "edit" ? "Save Changes" : "Add New Book";

  const doSubmit = (bookInfo) => {
    if (actionType === "edit") {
      dispatch(updateBook(bookID, bookInfo));
    } else if (actionType === "add") {
      const newBook = { ...bookInfo, id: bookID };
      dispatch(createBook(newBook));
    }
    setShow(false);
  };

  const initializedData =
    actionType === "edit"
      ? bookData
      : {
          name: "",
          price: "",
          category: "",
          description: "",
        };

  const formInfo = [
    {
      id: "name",
      label: "Name",
      type: "text",
      placeholder: "name",
    },
    {
      id: "price",
      label: "Price",
      type: "text",
      placeholder: "price",
    },
    {
      id: "category",
      label: "Category",
      type: "text",
      placeholder: "category",
    },
    {
      id: "description",
      label: "Description",
      type: "text",
      placeholder: "description",
    },
  ];

  const schema = {
    id: Joi.number().optional(),
    name: Joi.string().required().label("Name"),
    price: Joi.string().required().label("Price"),
    category: Joi.string().required().label("Category"),
    description: Joi.string().required().label("Description"),
  };

  const modalFooterButtons = [
    {
      type: "primary",
      buttonText: "Close",
      clickHandler: () => setShow(false),
    },
  ];

  return (
    <CustomModal
      showModal={show}
      setShowModal={setShow}
      footerButtons={modalFooterButtons}
      title={title}
    >
      <CustomForm
        formInfo={formInfo}
        doSubmit={doSubmit}
        schema={schema}
        initializedData={initializedData}
        buttonLabel={buttonLabel}
      />
    </CustomModal>
  );
};

export default BookDetailModal;
