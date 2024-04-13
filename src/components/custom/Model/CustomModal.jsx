import React from "react";
import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";

const RightAlignedModal = styled(Modal)`
  .modal-title {
    font-family: "Satoshi Variable", sans-serif;
    font-size: 18px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
  }
  .modal-header {
    background-color: #e7e7e7;
    border-radius: 0 !important;
    border-bottom: none;
  }
  .modal-body {
    background-color: #e7e7e7;
    border-radius: 0 !important;
    font-family: "Satoshi Variable", sans-serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 18px;
  }
`;

const CustomCloseButton = styled.button`
  position: absolute;
  right: 0.5rem;
  border: none;
  background: transparent;
  font-size: 18px
  cursor: pointer;
  &:before {
    content: "✖";
    color: black;
    font-size: 18px
  }
`;

const StyledModalTitle = styled(Modal.Title)`
  color: black;
  border: none;
  font-family: "Satoshi Variable", sans-serif;
  font-size: 18px !important;
  font-weight: 700;
  line-height: 160px;
  border-radius: 0;
`;
const StyledModalFooter = styled(Modal.Footer)`
  color: black;
  border: none;
  font-family: "Satoshi Variable", sans-serif;
  background-color: #e7e7e7;
  font-size: 18px !important;
  font-weight: 700;
  line-height: 160px;
  border-radius: 0;
`;

const CustomModal = ({
  title,
  showModal,
  setShowModal,
  children,
  footerButtons,
  size,
}) => {
  return (
    <RightAlignedModal
      show={showModal}
      onHide={() => setShowModal(false)}
      size={size || ""}
    >
      <Modal.Header>
        <StyledModalTitle>
          {title} <CustomCloseButton onClick={() => setShowModal(false)} />
        </StyledModalTitle>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>

      {footerButtons && footerButtons.length > 0 && (
        <StyledModalFooter>
          {footerButtons &&
            footerButtons.map((button) => (
              <Button
                as={button.as || null}
                to={button.to || null}
                className="mb-2"
                variant={button.type}
                onClick={button.clickHandler}
                key={`${title}-${button.buttonText}`}
                style={{
                  backgroundColor: "#c2c2c2",
                  border: "none",
                  borderRadius: "0",
                }}
              >
                {button.buttonText}
              </Button>
            ))}
        </StyledModalFooter>
      )}
    </RightAlignedModal>
  );
};

export default CustomModal;
