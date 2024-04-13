import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";

function GoBackButton() {
    const navigate = useNavigate();
    const goBack = () => navigate(-1); 
    return <Button onClick={goBack}>Go Back</Button>;
}

export default GoBackButton;