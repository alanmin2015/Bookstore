import React from 'react';
import { Form } from "react-bootstrap";

const FormUnitFrame = ({ children, label, formText, errors }) => {
    return (
        <>
            <Form.Label>{label}</Form.Label>
            {formText && < Form.Text className="text-muted">{' '}({formText})</Form.Text>}
            {children}
            {errors && <div size="sm" className="alert alert-primary">
                {errors}
            </div>}
        </>);
};

export default FormUnitFrame;