import React from 'react';
import { Button } from "react-bootstrap";
import styled from 'styled-components';

const StyledButton = styled(Button)`
  background-color: #FFDCBD !important;  // Use !important to override default Bootstrap styles
  border: 2px solid black;
  border-radius: 15px;
  font-size: 20px;
  color: black; // You can set the text color if needed

  &:hover {
    background-color: #E5C8A8 !important; // Optional: Change background color on hover
    border-color: #333; // Optional: Change border color on hover
  }
`;
const TableButton = ({ buttonInfo, styleInfo, selectedRow }) => {
    return (
        <React.Fragment key={`${buttonInfo.id}`}>
            <StyledButton
                className={styleInfo}
                variant={buttonInfo.type}
                onClick={() => buttonInfo.handleClick(selectedRow)}
                key={`button-${buttonInfo.id}`}
            >
                {buttonInfo.buttonText}
            </StyledButton>
        </React.Fragment>
    )
};

export default TableButton;